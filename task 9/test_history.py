import main

def test_memory():
    session_id = "test_session"
    
    # Turn 1: Tell name
    print("Turn 1: Telling chatbot name...")
    response1 = main.query_gemini_chat(session_id, "Hi, my name is Adejare. Remember this name!")
    print("Bot:", response1)
    
    # Turn 2: Query name
    print("\nTurn 2: Asking chatbot for name...")
    response2 = main.query_gemini_chat(session_id, "What is my name?")
    print("Bot:", response2)
    
    assert "adejare" in response2.lower(), f"Failed memory check! Bot did not remember name. Got response: {response2}"
    print("\nSUCCESS: Conversational memory check passed!")

if __name__ == "__main__":
    test_memory()
