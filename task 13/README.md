# Task 13: Java & Spring Boot Basics

## About
This project implements an enterprise gateway proxy using **Spring Boot**. The Spring Boot application exposes a `/api/springboot/chat` REST endpoint and acts as a gateway that forwards incoming JSON payloads to the FastAPI chatbot service.

Since local Java is not required to be installed on the developer's machine, the service is built and packaged inside a multi-stage **Docker container**.

## Features
- Spring Boot REST Controller acting as an API proxy.
- Integration mapping to FastAPI endpoints.
- Multi-stage Dockerized build.

## Building and Running (via Docker)
1. Build the Docker image:
   ```bash
   docker build -t springboot-gateway .
   ```
2. Run the container:
   ```bash
   docker run -p 8080:8080 -e fastapi.url=http://host.docker.internal:8000/api/chat springboot-gateway
   ```
3. Verify by making a POST request to `http://localhost:8080/api/springboot/chat` or visiting the health check: `http://localhost:8080/api/springboot/health`.
