import os
import hashlib
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import services

app = FastAPI(title="Aura Document Intelligence Portal")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory document context store
document_store = {}

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default_session"

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    filename = file.filename
    content_type = file.content_type
    
    file_bytes = await file.read()
    
    if filename.endswith(".pdf"):
        text_content = services.parse_pdf(file_bytes)
    elif filename.endswith(".txt"):
        text_content = file_bytes.decode('utf-8', errors='ignore')
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Only PDF and TXT allowed.")
        
    if "Error parsing PDF" in text_content or not text_content.strip():
        raise HTTPException(status_code=500, detail="Failed to extract text from the file.")
        
    # Generate unique document hash
    doc_id = "doc_" + hashlib.md5(text_content.encode('utf-8')).hexdigest()[:10]
    document_store[doc_id] = text_content
    
    # Run sequential analysis workflow
    analysis_results = services.run_workflow_pipeline(text_content)
    
    return {
        "doc_id": doc_id,
        "filename": filename,
        "character_count": len(text_content),
        "analysis": analysis_results
    }

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    user_msg = req.message.strip()
    session_id = req.session_id
    
    if not user_msg:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
        
    # Check cache first
    cache_key = f"capstone:{session_id}:{user_msg.lower()}"
    cached_response = services.get_cache(cache_key)
    if cached_response:
        return {
            "response": cached_response,
            "cache_status": "HIT"
        }
        
    # Build prompt combining document context (if exists)
    doc_context = ""
    # For demo simplicity, we use the last uploaded document as context
    if document_store:
        last_doc_id = list(document_store.keys())[-1]
        doc_context = f"\n[Document Context]:\n{document_store[last_doc_id][:3000]}\n"
        
    prompt = f"{doc_context}\nUser Question: {user_msg}"
    system_instruction = (
        "You are Aura, a senior technical document intelligence assistant. "
        "Reference the provided Document Context to answer user questions. "
        "If the document context doesn't contain the answer, use your general knowledge, "
        "but prioritize context."
    )
    
    model_response = services.query_gemini(prompt, system_instruction)
    
    # Save to cache
    services.set_cache(cache_key, model_response, ttl=600)
    
    return {
        "response": model_response,
        "cache_status": "MISS"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "UP",
        "redis_connected": services.redis_enabled,
        "document_count": len(document_store)
    }

# Mount static frontend
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
