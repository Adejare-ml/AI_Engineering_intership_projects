# Task 8: Evaluation & Testing

## About
This project implements an automated chatbot evaluation system. It runs a test suite of 10 curated questions across different categories (Geography, AI Concepts, Literature, Science, Mathematics, Civics, Finance, Physics, and Technology). The system queries the Google Gemini 2.5 Flash model and evaluates the accuracy of the responses based on keyword overlap (factual recall check).

## Features
- Automated querying of `gemini-2.5-flash` model.
- Robust rate-limiting protection with exponential backoff on HTTP 429 errors.
- Keyword evaluation algorithm to determine accuracy.
- Automated generation of a detailed Markdown report (`evaluation_report.md`).

## Setup & Running
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the evaluation script:
   ```bash
   python main.py
   ```
3. View the detailed results in `evaluation_report.md`.
