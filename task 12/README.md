# Task 12: Frontend/Backend Collaboration

## About
This project establishes a full-stack, local AI chat application. It packages the stateful Gemini chatbot API inside a **FastAPI** backend and pairs it with a premium **HTML/CSS/JS** user interface designed using glassmorphism styling, glowing backgrounds, and micro-interactions.

## Features
- **FastAPI backend**: Exposes `/api/chat` (POST) and `/api/history` (GET).
- **Session management**: Client generates unique random sessions to maintain separated conversation tracks.
- **Typing indicators**: Animated loading dots show up while awaiting the Gemini API response.
- **Responsive design**: Layout works beautifully on both desktop monitors and smaller device viewports.

## Setup & Running
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   python backend/main.py
   ```
3. Open a web browser and navigate to `http://127.0.0.1:8000` to interact with Aura.
