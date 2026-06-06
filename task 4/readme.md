
# Data Ingestion and Cleaning Pipeline

## 📝 Overview

This repository contains an automated data ingestion and preprocessing pipeline built using Python and Pandas, structured as a Jupyter Notebook (`data_ingestion_pipeline.ipynb`).

The pipeline is designed to intake dirty, unformatted datasets (specifically tested on `car-sales-extended-missing-data.csv`), standardize the schema, perform basic exploratory data analysis (EDA), intelligently handle missing values, and export a clean, machine-learning-ready CSV file.

## ✨ Features

* **Multi-format Ingestion:** Ready to load data from CSV, JSON, or plain text formats.
* **Schema Normalization:** Automatically standardizes column names to `snake_case` to prevent syntax errors during analysis.
* **Exploratory Data Analysis (EDA):** Generates statistical summaries and counts missing values/categories.
* **Smart Data Imputation:**
* Numerical data: Imputed using the **median** (robust against outliers).
* Categorical data: Imputed using a placeholder (`'missing'`).


* **Automated Export:** Outputs a clean `.csv` file stripped of unnecessary index columns.

---

## 📂 Project Structure

```text
📁 Project Directory
 ├── 📄 README.md                             # Project documentation
 ├── 📓 data_ingestion_pipeline.ipynb         # The main Jupyter Notebook pipeline
 ├── 📊 car-sales-extended-missing-data.csv   # Raw input dataset
 └── 📈 cleaned_car_sales.csv                 # Cleaned output dataset (Generated)

```

---

## 🛠️ Prerequisites

To run this pipeline locally, you will need Python 3 installed along with the following libraries:

* `pandas`
* `numpy`
* `jupyter` (or JupyterLab / VS Code with Jupyter extensions)

You can install the dependencies using pip:

```bash
pip install pandas numpy jupyter

```

---

## 🚀 Pipeline Breakdown

The Jupyter Notebook is divided into 5 distinct steps:

### 1. Data Ingestion

Loads the raw data into a Pandas DataFrame. While the current notebook uses `.read_csv()`, it can easily be adapted to `.read_json()` or `.read_table()` depending on your source data.

### 2. Column Normalization

Raw datasets often contain column names with spaces, mixed casing, or special characters (e.g., `Odometer (KM)`). The pipeline cleans this by:

* Stripping leading/trailing whitespace.
* Converting all text to lowercase.
* Replacing spaces with underscores (`_`).
* Removing parentheses and special characters.
*(e.g., `Odometer (KM)` becomes `odometer_km`)*

### 3. Exploratory Data Analysis (EDA)

Provides a high-level overview of the dataset's health before cleaning:

* `df.describe(include='all')`: Displays summary statistics for all columns.
* `df.isnull().sum()`: Highlights exactly where data is missing.
* `df.value_counts()`: Shows the distribution of categories within text-based columns.

### 4. Handling Missing Values

Instead of dropping rows with missing data (which can lead to data loss), the pipeline imputes missing values:

* **Numerical columns (`float64`, `int64`):** Fills `NaN` values with the median of that specific column.
* **Categorical columns (`object`):** Fills `NaN` values with the string `'missing'`.

### 5. Export Cleaned Data

Once verified that zero missing values remain, the pipeline exports the finalized DataFrame to `cleaned_car_sales.csv` using `df.to_csv(index=False)`.

---

## 💻 How to Run

1. Clone or download this repository/folder to your local machine.
2. Ensure your raw data file (`car-sales-extended-missing-data.csv`) is in the same directory as the notebook.
3. Open your terminal or command prompt and navigate to the project folder.
4. Launch Jupyter Notebook:
```bash
jupyter notebook

```


5. Open `data_ingestion_pipeline.ipynb` and click **"Run All"** (or execute the cells one by one via `Shift + Enter`).
6. Check your directory for the newly generated `cleaned_car_sales.csv` file!