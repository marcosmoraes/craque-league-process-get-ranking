# System Architecture

## Overview

The League Process Get Ranking is a serverless service responsible for retrieving and calculating user rankings and points across multiple leagues. It follows a serverless architecture using AWS Lambda as the main function, with well-defined layers to ensure separation of responsibilities and maintainability.

## Architecture Diagram

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "API Gateway"
            APIG[API Gateway]
        end

        subgraph "Lambda Functions"
            GetUserPoints[getUserPoints]
            GetUserPointsByLeague[getUserPointsByLeague]
            GetUserRankingByBubbleIds[getUserRankingByBubbleIds]
        end

        subgraph "MongoDB"
            Mongo[(MongoDB)]
            Bets[(Bets Collection)]
            Rankings[(Rankings Collection)]
        end
    end

    %% Connections
    APIG -->|HTTP/REST| GetUserPoints
    APIG -->|HTTP/REST| GetUserPointsByLeague
    APIG -->|HTTP/REST| GetUserRankingByBubbleIds
    
    GetUserPoints -->|Query| Mongo
    GetUserPointsByLeague -->|Query| Mongo
    GetUserRankingByBubbleIds -->|Query| Mongo

    %% Styling
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px;
    classDef lambda fill:#009900,stroke:#232F3E,stroke-width:2px;
    classDef db fill:#13aa52,stroke:#232F3E,stroke-width:2px;

    class APIG aws;
    class GetUserPoints,GetUserPointsByLeague,GetUserRankingByBubbleIds lambda;
    class Mongo,Bets,Rankings db;
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Client
    participant APIG as API Gateway
    participant Lambda as Lambda Function
    participant Service as Ranking Service
    participant DA as Data Access
    participant Mongo as MongoDB

    Client->>APIG: POST /get-user-points
    APIG->>Lambda: HTTP Event
    
    Lambda->>Service: getUserPointsByBubbleId()
    Service->>DA: Query database
    DA->>Mongo: Aggregate points
    Mongo-->>DA: Return results
    DA-->>Service: Process data
    Service-->>Lambda: Return points
    Lambda-->>APIG: HTTP Response
    APIG-->>Client: Return ranking
```

## System Layers

### 1. API Layer (handler.js)
- Receives HTTP requests
- Validates input parameters
- Routes to appropriate services
- Handles error responses

### 2. Domain Layer (domain/)
- Implements business logic
- Calculates user points
- Manages ranking logic
- Processes multiple leagues

### 3. Infrastructure Layer (infrastructure/)
- Database connection management
- External service configurations
- Dependency management

### 4. Utils Layer (utils/)
- Utility functions
- Logging and monitoring
- Processing helpers

## Data Flow
1. HTTP request received by API Gateway
2. Lambda function processes request
3. Service layer coordinates business logic
4. Data Access layer queries MongoDB
5. Response is formatted and returned

## Security Considerations
- Input parameter validation
- Error handling and logging
- Processing state tracking
- Configurable timeouts (600s for getUserRankingByBubbleIds)

## Scalability
- Serverless architecture enables automatic scaling
- Asynchronous ranking processing
- Optimized database queries
- Performance monitoring through logging