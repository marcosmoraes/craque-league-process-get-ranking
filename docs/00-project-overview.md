# Project Overview

## Name
League Process Get Ranking

## Description
Service responsible for processing and returning user rankings and points in leagues and pools of the Craque system. The service provides endpoints to query individual points by pool, by league, and consolidated rankings based on multiple pools.

## Main Features
- Query user points by pool (bubbleId)
- Query user points by league (leagueId)
- Calculate consolidated ranking based on multiple pools
- Processing state logging for monitoring

## Technology Stack
- Node.js 18.x
- AWS Lambda
- Serverless Framework
- MongoDB (for data storage)
- Serverless Offline (for local development)

## Repository Structure
```
.
├── domain/           # Business logic and domain rules
├── infrastructure/   # Infrastructure configurations
├── utils/           # Utilities and helpers
├── handler.js       # Lambda functions entry point
├── serverless.yml   # Serverless Framework configuration
└── package.json     # Project dependencies
```

## Environment Variables
- `MONGODB_URI`: MongoDB connection URI
- `NODE_ENV`: Execution environment (development/production)
- `LOG_LEVEL`: System log level