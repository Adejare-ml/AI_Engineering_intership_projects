# Task 15: Capstone Development

## About
This project implements the MVP (Minimum Viable Product) for the **Aura Document Intelligence Portal**. It binds together all the engineering disciplines covered in the curriculum:
1. **Document Ingestion**: Parsing PDF and TXT documents.
2. **Analysis Workflows**: Summarization, takeaway, and recommendation extraction.
3. **Conversational Interface**: Stateful dialogue context referencing the document.
4. **Performance Caching**: Redis-backed cache lookup to achieve sub-5ms latencies.
5. **REST API Gateway**: Built with FastAPI.
6. **Premium Web Interface**: Built with Outfit typography, glowing background shaders, and responsive glassmorphic cards.

## Features
- Dynamic drag-and-drop document uploader.
- Live conversational client to interrogate documents.
- Automated testing harness with `pytest`.
- Response caching to minimize model billing and latency.

## Setup & Running
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   python backend/app.py
   ```
3. Open a browser and navigate to `http://127.0.0.1:8000`.

## Running Tests
To run the automated test suite, execute the following command:
```bash
pytest tests/
```
