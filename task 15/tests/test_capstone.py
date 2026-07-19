import sys
import os
from fastapi.testclient import TestClient

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "../backend"))

from app import app
import services

client = TestClient(app)

def test_health_check():
    """Tests the FastAPI health endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "UP"

def test_chat_without_document():
    """Tests basic chat functionality without active document context."""
    response = client.post(
        "/api/chat",
        json={"message": "Hello, who are you?", "session_id": "test_session_pytest"}
    )
    assert response.status_code == 200
    assert "response" in response.json()
    assert "cache_status" in response.json()

def test_pdf_parsing_empty_bytes():
    """Tests that PDF parsing handles invalid or empty inputs gracefully."""
    empty_pdf_output = services.parse_pdf(b"")
    assert "Error parsing PDF" in empty_pdf_output

def test_caching_layer():
    """Tests the get/set logic of the caching layer."""
    key = "test_pytest_key"
    val = "cached_test_value"
    services.set_cache(key, val, ttl=60)
    retrieved = services.get_cache(key)
    assert retrieved == val
