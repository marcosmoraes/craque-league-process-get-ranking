# API Documentation

## Endpoints

### GET /get-user-points
Returns user points in a specific pool.

#### Request
```json
{
  "bubbleId": "string"
}
```

#### Response (200)
```json
{
  "userPoints": [
    {
      "userId": "string",
      "points": number,
      "position": number
    }
  ]
}
```

#### Response (400)
```json
{
  "message": "bubbleId is required"
}
```

#### Response (500)
```json
{
  "message": "Internal Server Error"
}
```

### GET /get-user-points-by-league
Returns user points in a specific league.

#### Request
```json
{
  "leagueId": "string"
}
```

#### Response (200)
```json
{
  "userPoints": [
    {
      "userId": "string",
      "points": number,
      "position": number
    }
  ]
}
```

#### Response (400)
```json
{
  "message": "leagueId is required"
}
```

#### Response (500)
```json
{
  "message": "Internal Server Error"
}
```

### GET /get-user-ranking-by-bubble-ids
Calculates and returns the consolidated ranking based on multiple pools.

#### Request
```json
{
  "bubbleIds": ["string"]
}
```

#### Response (200)
```json
{
  "rankings": [
    {
      "userId": "string",
      "totalPoints": number,
      "position": number,
      "bubblePoints": [
        {
          "bubbleId": "string",
          "points": number
        }
      ]
    }
  ]
}
```

#### Response (400)
```json
{
  "message": "bubbleIds array is required"
}
```

#### Response (500)
```json
{
  "message": "Internal Server Error"
}
```

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

## Error Codes
- 400: Bad Request - Invalid or missing parameters
- 500: Internal Server Error - Server internal error

## Limitations
- 600s timeout for consolidated ranking operations
- Requires authentication (not documented here)
- Payload size limit (defined by API Gateway)
- Rate limiting (defined by API Gateway)