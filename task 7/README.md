# Real-Time API Data Chatbot

## About
This project implements a lightweight command-line chatbot that integrates real-time external REST APIs to fetch dynamic data. It leverages weather data APIs and currency exchange rate APIs to answer user queries with live details. The chatbot interprets queries locally, processes external GET requests with structured API keys, parses JSON responses, and formats the output into user-friendly responses.

## Features
- Real-time weather reporting by query (e.g. `weather London`).
- Real-time currency conversion rates between major pairs (e.g. `currency USD EUR`).
- Lightweight CLI routing control loop.

## Setup & Running
1. Navigate to the project directory:
   ```bash
   cd "task 7"
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure your api key environment inside a `.env` file based on the provided `.env.example` template.
5. Run the chatbot CLI:
   ```bash
   python main.py
   ```
