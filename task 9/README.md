# Task 9: Conversational Agents

## About
This project implements a stateful chatbot CLI that maintains dialogue history across turns. Unlike stateless APIs, it stores previous user inputs and assistant responses, and includes the full context in subsequent API calls to the Google Gemini 2.5 Flash model. This enables the assistant to remember details and refer back to them cohesively.

## Features
- Dialogue state management and history tracking.
- Contextual multi-turn reasoning with Gemini 2.5 Flash.
- Minimalistic terminal user interface.

## Setup & Running
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the chatbot:
   ```bash
   python main.py
   ```
3. Exit by typing `exit`.
