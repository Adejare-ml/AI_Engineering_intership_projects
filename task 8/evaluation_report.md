# Chatbot Evaluation Report

## Executive Summary
- **Model Evaluated**: `gemini-2.5-flash`
- **Total Test Cases**: 10
- **Successful Matches (PASS)**: 10
- **Failed Matches (FAIL)**: 0
- **Accuracy**: 100.00%

## Methodology
The evaluation suite consists of 10 general knowledge and technical questions.
The system is evaluated based on **keyword presence** (a standard factual recall metric). A test case is marked as **PASS** if at least **50%** of the expected keywords/concepts are found in the chatbot's response.

## Detailed Results

| ID | Category | Question | Expected Keywords | Chatbot Response (Snippet) | Score | Status |
|---|---|---|---|---|---|---|
| 1 | Geography | What is the capital of France? | paris | The capital of France is Paris. | 1.00 | PASS |
| 2 | AI Concepts | Explain what a neural network is in one sentence. | neuron, network, nodes, layers | A neural network is a computational model inspired by the brain, consisting of layers of nodes/ne... | 1.00 | PASS |
| 3 | Literature | Who wrote Romeo and Juliet? | shakespeare | William Shakespeare wrote Romeo and Juliet. | 1.00 | PASS |
| 4 | Science | What is the boiling point of water in Celsius? | 100 | The boiling point of water is 100 degrees Celsius. | 1.00 | PASS |
| 5 | Science | What is the primary function of DNA? | genetic, information, code, hereditary | The primary function of DNA is to store genetic information and code for hereditary transmission. | 1.00 | PASS |
| 6 | Mathematics | What is the square root of 144? | 12 | The square root of 144 is 12. | 1.00 | PASS |
| 7 | Civics | Name the three branches of the United States government. | legislative, executive, judicial | The three branches of the US government are the legislative, executive, and judicial branches. | 1.00 | PASS |
| 8 | Finance | What is the currency of Japan? | yen | The currency of Japan is the Japanese Yen. | 1.00 | PASS |
| 9 | Physics | What is the speed of light? | 299,792, 300,000, speed of light, m/s, km/s | The speed of light is approximately 299,792,458 m/s (or 300,000 km/s). | 1.00 | PASS |
| 10 | Technology | What is the main programming language used for Android development? | kotlin, java | Kotlin and Java are the main programming languages used for Android development. | 1.00 | PASS |

## Conclusion
This evaluation shows the accuracy of Gemini 2.5 Flash in answering factual and reasoning questions. Recommendations for improvement include prompt engineering or retrieval-augmented generation (RAG) for more domain-specific queries.
