# Task 6: RAG-Powered Q&A Pipeline

## About
This project implements a Retrieval-Augmented Generation (RAG) pipeline designed to answer domain-specific questions about a text document. Built using the **LangChain** framework, it processes raw document text (`sample_data.txt`), splits it into semantically focused chunks, encodes those chunks into vector embeddings, and stores them in a local **ChromaDB** vector database. When a user asks a question, the system queries ChromaDB to retrieve the most contextually relevant chunks, compiles them into a structured prompt, and queries a Large Language Model to generate an accurate, hallucination-free response grounded in the document context.

## Pipeline Steps
1. **Document Loading & Splitting**: Reads `sample_data.txt` and chunks it using `RecursiveCharacterTextSplitter`.
2. **Vector Store & Embeddings**: Generates embeddings and builds a local ChromaDB instance.
3. **RAG Chain Setup**: Configures a retrieval chain routing user questions through retrieved document context.
4. **Q&A Execution**: Evaluates responses for factual answers.

## Project Structure
```
task_6/
├── task6.ipynb          # Main Jupyter notebook
├── sample_data.txt      # Domain-specific text corpus
└── README.md            # This file
```

## Setup & Running
1. Install dependencies:
   ```bash
   pip install langchain chromadb langchain-community langchain-openai jupyter
   ```
2. Navigate to the project directory:
   ```bash
   cd task_6
   ```
3. Run the Jupyter Notebook:
   ```bash
   jupyter notebook task6.ipynb
   ```
