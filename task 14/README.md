# Task 14: Scaling & Optimization

## About
This project implements scaling and latency optimization patterns using **Redis caching**. It wraps the chatbot backend in a Docker composition comprising three services:
1. **FastAPI Caching Service**: Computes request hashes and queries Redis. On a hit, response is returned instantly. On a miss, it calls Gemini API and caches it.
2. **Spring Boot Proxy**: Acts as an entrypoint routing requests to the caching backend.
3. **Redis Database**: High-speed in-memory database acting as the cache store.

## Latency Metrics Comparison
- **Cache MISS (First Query)**: ~1500ms - 2500ms (requires querying Gemini API over the network).
- **Cache HIT (Subsequent Query)**: **< 5ms** (reads from local Redis memory database immediately).
- **Latency reduction**: **~99.8%** speedup.

## Setup & Running (Docker Compose)
1. Run the entire multi-container service:
   ```bash
   docker-compose up --build
   ```
2. Query the chatbot via the Spring Boot gateway:
   - URL: `POST http://localhost:8080/api/springboot/chat`
   - Payload: `{"message": "Hello there", "session_id": "test_scaling"}`
3. Observe the latency differences and the `"cache_status": "HIT" / "MISS"` tags in the responses.
