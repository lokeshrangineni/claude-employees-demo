# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Python-based REST API web application.

## Tech Stack

- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Server**: Uvicorn
- **Dependency Management**: pip with requirements.txt

## Project Structure

```
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app entry point
│   ├── routers/         # API route modules
│   ├── models/          # Pydantic models
│   ├── services/        # Business logic
│   └── config.py        # Configuration
├── tests/
│   └── test_*.py
├── requirements.txt
└── README.md
```

## Common Commands

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload

# Run tests
pytest

# Format code
black .

# Lint code
ruff check .
```

## Development Environment

- IDE: IntelliJ IDEA (with Python plugin)

## API Conventions

- Use RESTful resource naming (plural nouns)
- Return appropriate HTTP status codes
- Use Pydantic models for request/response validation
- Include OpenAPI documentation (auto-generated at /docs)