# System Components

## Data Models
### UserPoints
```typescript
interface UserPoints {
  userId: string;
  points: number;
  position: number;
}
```

### Ranking
```typescript
interface Ranking {
  userId: string;
  totalPoints: number;
  position: number;
  bubblePoints: {
    bubbleId: string;
    points: number;
  }[];
}
```

## Services
### UserPointsService (domain/service/user-points-service.js)
- `getUserPointsByBubbleId(bubbleId)`: Returns user points in a specific pool
- `getUserPointsByLeagueId(leagueId)`: Returns user points in a specific league
- `getUserRankingByBubbleIds(bubbleIds)`: Calculates consolidated ranking based on multiple pools

### LogProcessingState (utils/log-processing-state.js)
- `logProcessingState(bubbleId, operation, status, error)`: Records processing states for monitoring and debugging

## Data Access
### MongoDB
- Connection configured in `infrastructure/`
- Optimized queries for ranking lookups
- Indexes for better performance in frequent queries

## Endpoints
### GET /get-user-points
- Method: POST
- Handler: `handler.getUserPoints`
- Parameters: `bubbleId`
- Returns: List of user points in a pool

### GET /get-user-points-by-league
- Method: POST
- Handler: `handler.getUserPointsByLeague`
- Parameters: `leagueId`
- Returns: List of user points in a league

### GET /get-user-ranking-by-bubble-ids
- Method: POST
- Handler: `handler.getUserRankingByBubbleIds`
- Parameters: `bubbleIds` (array)
- Returns: Consolidated ranking based on multiple pools
- Timeout: 600s

## Processing Flows
1. **Query Points by Pool**
   - Receives bubbleId via POST
   - Validates required parameter
   - Queries points in database
   - Returns list ordered by position
   - Processing state logging

2. **Query Points by League**
   - Receives leagueId via POST
   - Validates required parameter
   - Queries points in database
   - Returns list ordered by position

3. **Calculate Consolidated Ranking**
   - Receives bubbleIds array via POST
   - Validates non-empty array
   - Processes points from each pool
   - Calculates total points per user
   - Orders by total points
   - Returns consolidated ranking with pool details