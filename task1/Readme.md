
# AI Engineering Internship Task 1

## BBC News Text Cleaning Pipeline

This project builds a simple text cleaning pipeline using Python and the BBC News dataset.

The notebook first downloads the dataset from the web using the `requests` library and saves the zipped file locally on the machine.

Since the dataset comes as a `.zip` file, the `zipfile` library is then used to extract all the contents.

After extraction, the project uses the `pathlib` library to trace through the folders and locate all the `.txt` news article files we want to work with.

The text files are then loaded and converted into a pandas DataFrame for preprocessing.

The preprocessing steps include:

* converting text to lowercase
* removing punctuation
* removing stopwords
* tokenizing text using `nltk`

Finally, the cleaned text data is saved into a CSV file for further NLP or machine learning tasks.

---

## Pipeline Steps

* Download dataset from the web using `requests`
* Save dataset locally as a zip file
* Extract dataset using `zipfile`
* Locate all `.txt` files using `pathlib`
* Read text articles into Python
* Convert articles into a pandas DataFrame
* Clean text by:

  * lowercasing
  * removing punctuation
  * removing stopwords
  * tokenizing with NLTK
* Save cleaned data to CSV

---

## Requirements

To install all libraries needed for this project, run:

```bash
pip install -r requirements.txt
```

The required libraries are already listed inside the `requirements.txt` file.

---

## How to Run

1. Clone the repository

```bash
git clone https://github.com/Adejare-ml/AI_Engineering_intership_projects.git
```

2. Move into the task folder

```bash
cd AI_Engineering_intership_projects/task1
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Open the notebook

```bash
jupyter notebook Task1.ipynb
```

5. Run all cells in the notebook

The notebook will:

* download the dataset
* extract the files
* process the text
* generate the cleaned CSV output

---

## Output

The final output is a cleaned CSV file containing:

* original text
* cleaned text
* tokenized text

This output can be used for:

* NLP preprocessing
* text classification
* sentiment analysis
* machine learning projects

---

## Technologies Used

* Python
* Pandas
* NLTK
* Requests
* Zipfile
* Pathlib
* Jupyter Notebook
