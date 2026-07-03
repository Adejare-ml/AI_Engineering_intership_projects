import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Keys and Base URLs
WEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
CURRENCY_URL = "https://v6.exchangerate-api.com/v6/{api_key}/latest/{base}"
CURRENCY_API_KEY = os.getenv("CURRENCY_API_KEY")

def get_weather(city):
    """Fetches real-time weather data for a given city."""
    try:
        params = {
            "q": city,
            "appid": WEATHER_API_KEY,
            "units": "metric"
        }
        response = requests.get(WEATHER_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        temp = data["main"]["temp"]
        desc = data["weather"][0]["description"]
        return f"The current weather in {city} is {temp}°C with {desc}."
    except requests.exceptions.HTTPError as e:
        return f"HTTP Error: Could not find weather for {city}. ({e})"
    except Exception as e:
        return f"An unexpected error occurred: {e}"

def get_currency(base, target):
    """Fetches real-time exchange rate between two currencies."""
    try:
        url = CURRENCY_URL.format(api_key=CURRENCY_API_KEY, base=base)
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        rate = data["conversion_rates"].get(target)
        if rate:
            return f"The current exchange rate from {base} to {target} is {rate}."
        return f"Currency {target} not found."
    except requests.exceptions.HTTPError as e:
        return f"HTTP Error: Failed to fetch currency data. ({e})"
    except Exception as e:
        return f"An unexpected error occurred: {e}"

def main():
    print("--- Real-Time API Data Chatbot ---")
    print("Commands: 'weather [city]', 'currency [base] [target]', or 'exit' to quit.")
    
    while True:
        user_input = input("\nYou: ").strip().lower()
        if user_input == 'exit':
            print("Goodbye!")
            break
            
        if user_input.startswith("weather"):
            parts = user_input.split(" ", 1)
            if len(parts) < 2:
                print("Please specify a city. Example: weather London")
                continue
            city = parts[1]
            print(f"Bot: {get_weather(city)}")
            
        elif user_input.startswith("currency"):
            parts = user_input.split(" ")
            if len(parts) < 3:
                print("Please specify base and target currencies. Example: currency USD EUR")
                continue
            base, target = parts[1].upper(), parts[2].upper()
            print(f"Bot: {get_currency(base, target)}")
            
        else:
            print("I didn't understand that. Try 'weather [city]' or 'currency [base] [target]'.")

if __name__ == "__main__":
    main()
