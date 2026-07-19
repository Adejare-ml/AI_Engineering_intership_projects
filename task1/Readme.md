# Task 1: BBC News Text Cleaning Pipeline

## About
This project implements an automated text ingestion and preprocessing pipeline for NLP tasks. It downloads the raw BBC News dataset, extracts the text contents from a compressed format, walks the directory structure using Pathlib, loads the raw news articles into a Pandas DataFrame, and performs systematic data cleaning. The pipeline applies lowercasing, punctuation removal, stopword filtering, and tokenization (using NLTK), exporting a structured, cleaned dataset ready for machine learning classification.

## Pipeline Steps
- Download dataset from the web using `requests`.
- Save dataset locally as a zip file.
- Extract dataset using `zipfile`.
- Locate all `.txt` files recursively using `pathlib`.
- Read text articles and convert into a pandas DataFrame.
- Clean text by lowercasing, removing punctuation, and filtering stopwords.
- Tokenize text with NLTK.
- Save cleaned data to CSV.

## Setup & Running
1. Clone the repository and navigate to the directory:
   ```bash
   cd task1
   ```
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Jupyter Notebook:
   ```bash
   jupyter notebook Task1.ipynb
   ```

## Output
The final output is a cleaned CSV file containing:
- Original raw text
- Preprocessed, cleaned text
- Tokenized text array

This structured output can be used for text classification, sentiment analysis, or search indexing.

## Technologies Used
- Python
- Pandas
- NLTK (Natural Language Toolkit)
- Requests, Zipfile, Pathlib
