# LangChain Gemini Chatbot

## About
This project implements a conversational chatbot using the **LangChain** orchestrator and Google's **Gemini API**. It demonstrates the use of LangChain chains (`LLMChain` / LangChain Expression Language) combined with in-memory chat histories (`ChatMessageHistory`) to create a stateful multi-turn chatbot. This setup allows user dialogues to persist across sequential prompts, ensuring that context is carried over from turn to turn within a given chat session.

---

## The Task
The goal was to build a simple chatbot using LangChain chains — not a complex RAG pipeline, not an agent, just the basics: user asks a question, the chain processes it, the model responds. The requirements were:
- Accept user questions and return answers via LangChain chains.
- Test with 5 sample queries.
- Document setup clearly (API key usage, environment variables).

---

## Why Gemini, Not OpenAI
Development started with the OpenAI API (`ChatOpenAI`, GPT-4o-mini). The chain worked and the code was structurally correct, but the API key hit its rate limit before testing could be completed.

Rather than wait for the limit to reset, the model was swapped to **Google Gemini** (`ChatGoogleGenerativeAI`, gemini-2.5-flash). Gemini's free tier is more generous for development usage. The full 5-query test and multi-turn demo were run successfully on Gemini before this was submitted.

The switch required changing one import and one line of initialisation — everything else (chain structure, memory, session handling) stayed identical. That is the value of LangChain's abstraction.

---

## Requirements
**Python:** 3.9 or higher

**Packages:**

| Package | Version | Why |
|---|---|---|
| `langchain-core` | >=0.3.0 | Prompt templates, LCEL chain, output parser |
| `langchain-google-genai` | >=2.0.0 | `ChatGoogleGenerativeAI` — connects to Gemini |
| `langchain-community` | >=0.3.0 | `ChatMessageHistory` for in-memory session storage |

Install all at once:
```bash
pip install -r requirements.txt
```

---

## API Key Setup
The notebook reads `GOOGLE_API_KEY` from your environment. You need to set this before running anything.

**Get a key:** Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey) — sign in with a Google account and generate a key. The free tier is enough for this project.

**Set the variable:**

Linux / macOS
```bash
export GOOGLE_API_KEY="your-key-here"
```

Windows Command Prompt
```cmd
set GOOGLE_API_KEY=your-key-here
```

Windows PowerShell
```powershell
$env:GOOGLE_API_KEY = "your-key-here"
```

---

## How to Run
```bash
# 1. Move into the task folder
cd "task 3"

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set your API key
export GOOGLE_API_KEY="your-key-here"

# 4. Launch the notebook
jupyter notebook langchainbot.ipynb
```

---

## What Was Tested

| # | Query | Session |
|---|---|---|
| 1 | What is machine learning? | `q1` |
| 2 | Explain supervised vs unsupervised learning with one example each. | `q2` |
| 3 | What is a transformer and why did it replace RNNs? | `q3` |
| 4 | What is RAG and when would you use it instead of fine-tuning an LLM? | `q4` |
| 5 | What are LangChain chains and what problem do they solve? | `q5` |

Multi-turn test confirmed the model carries context across 3 linked turns in a shared session.

---

## Project Structure
```
task 3/
├── langchainbot.ipynb   # The notebook
├── requirements.txt     # Package dependencies
└── README.md            # This file
```
