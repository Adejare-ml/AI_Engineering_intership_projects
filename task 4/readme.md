# Data Ingestion and Cleaning Pipeline

## About
This project implements an automated, Pandas-based data ingestion and preprocessing pipeline. It is designed to consume raw, unformatted datasets containing missing values (specifically tested on the `car-sales-extended-missing-data.csv` dataset), perform exploratory data analysis (EDA), normalize column schemas to standard naming conventions, impute missing values (numerical using medians, categorical using placeholders), and export clean, machine-learning-ready datasets.

## Features
- **Multi-format Ingestion**: Ready to load data from CSV, JSON, or plain text formats.
- **Schema Normalization**: Standardizes raw column headers into uniform lowercase `snake_case` (e.g. `Odometer (KM)` becomes `odometer_km`).
- **Exploratory Data Analysis (EDA)**: Automatic generation of statistical summaries, feature distributions, and missing count arrays.
- **Smart Data Imputation**:
  - *Numerical data*: Imputed using the median to stay robust against outlier skewing.
  - *Categorical data*: Imputed using the placeholder string `'missing'`.
- **Automated Export**: Saves index-free CSV files ready for machine learning model ingestion.

## Project Structure
```
task 4/
├── Task_4.ipynb                          # The main Jupyter Notebook pipeline
├── car-sales-extended-missing-data.csv   # Raw input dataset
├── cleaned_car_sales.csv                 # Cleaned output dataset (Generated)
└── README.md                             # Project documentation
```

## Setup & Running
1. Install dependencies:
   ```bash
   pip install pandas numpy jupyter
   ```
2. Navigate to the project directory:
   ```bash
   cd "task 4"
   ```
3. Run the Jupyter environment:
   ```bash
   jupyter notebook Task_4.ipynb
   ```
4. Run all cells to process the dataset and generate the cleaned CSV output.