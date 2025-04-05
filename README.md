# Reverse Coding Event Platform

[![Docker](https://img.shields.io/badge/Docker-Containerized-blue)](https://docker.com)
[![Azure VM](https://img.shields.io/badge/Cloud-Azure%20VM-blue)](https://azure.microsoft.com)
[![NGINX](https://img.shields.io/badge/Server-NGINX-green)](https://nginx.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org)
[![JWT Auth](https://img.shields.io/badge/Security-JWT-orange)](https://jwt.io)

A competitive Reverse Coding event platform backend with real-time features, containerized with Docker and hosted on Azure VM with NGINX reverse proxy. Successfully handled 200+ participants during coding competitions.

## Key Features

- **Reverse Coding Challenge**:
  - Problem statements without explicit instructions
  - Participants deduce functionality from given examples
  - Two-attempt system with scoring penalties

- **Competitive Mechanics**:
  - Streak-based rewards (3 correct solutions unlock lifelines)
  - Time-pressured environment with synchronized timers
  - Junior/Senior question partitioning

- **KBC-style Lifelines**:
  - **Skip Challenge**: Get a new problem statement
  - **Time Freeze**: Pause the countdown timer
  - **Double Points**: 2x score for current challenge

## My Contributions

### 1. Lifeline System Implementation
- Built 3 core lifeline APIs:
  - Skip Challenge (Replace current question)
  - Time Freeze (Pause timer temporarily)
  - Double Points (Score multiplier)
- Integrated with streak system (unlocked after 3 consecutive correct answers)
- Added scoring penalties for lifeline usage

### 2. Docker Deployment
- Created Dockerfile for Node.js application
- Set up docker-compose for local development with:
  - PostgreSQL container
  - Redis container
  - Application container

### 3. Azure VM Deployment
- Deployed Ubuntu 24.01 VM on Azure
- Basic NGINX configuration:
  - Reverse proxy to Node.js app
  - SSL setup with Let's Encrypt
  - Static file serving
- Configured:
  - Automatic container restart on failure
  - Basic firewall rules
  - SSH key authentication
