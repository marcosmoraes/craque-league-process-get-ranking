# Documentação da API

## Endpoints

### GET /get-user-points
Retorna as pontuações dos usuários em um bolão específico.

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
Retorna as pontuações dos usuários em uma liga específica.

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
Calcula e retorna o ranking consolidado baseado em múltiplos bolões.

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

## Modelos de Dados

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

## Códigos de Erro
- 400: Bad Request - Parâmetros inválidos ou ausentes
- 500: Internal Server Error - Erro interno do servidor

## Limitações
- Timeout de 600s para operações de ranking consolidado
- Requer autenticação (não documentada aqui)
- Limite de tamanho do payload (definido pelo API Gateway)
- Rate limiting (definido pelo API Gateway)