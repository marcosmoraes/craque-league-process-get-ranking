# Componentes do Sistema

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

## Serviços
### UserPointsService (domain/service/user-points-service.js)
- `getUserPointsByBubbleId(bubbleId)`: Retorna pontuações de usuários em um bolão específico
- `getUserPointsByLeagueId(leagueId)`: Retorna pontuações de usuários em uma liga específica
- `getUserRankingByBubbleIds(bubbleIds)`: Calcula ranking consolidado baseado em múltiplos bolões

### LogProcessingState (utils/log-processing-state.js)
- `logProcessingState(bubbleId, operation, status, error)`: Registra estados de processamento para monitoramento e debugging

## Data Access
### MongoDB
- Conexão configurada em `infrastructure/`
- Queries otimizadas para consultas de ranking
- Índices para melhor performance em consultas frequentes

## Endpoints
### GET /get-user-points
- Método: POST
- Handler: `handler.getUserPoints`
- Parâmetros: `bubbleId`
- Retorna: Lista de pontuações de usuários em um bolão

### GET /get-user-points-by-league
- Método: POST
- Handler: `handler.getUserPointsByLeague`
- Parâmetros: `leagueId`
- Retorna: Lista de pontuações de usuários em uma liga

### GET /get-user-ranking-by-bubble-ids
- Método: POST
- Handler: `handler.getUserRankingByBubbleIds`
- Parâmetros: `bubbleIds` (array)
- Retorna: Ranking consolidado baseado em múltiplos bolões
- Timeout: 600s

## Fluxos de Processamento
1. **Consulta de Pontuação por Bolão**
   - Recebe bubbleId via POST
   - Valida parâmetro obrigatório
   - Consulta pontuações no banco de dados
   - Retorna lista ordenada por posição
   - Logging de estado do processamento

2. **Consulta de Pontuação por Liga**
   - Recebe leagueId via POST
   - Valida parâmetro obrigatório
   - Consulta pontuações no banco de dados
   - Retorna lista ordenada por posição

3. **Cálculo de Ranking Consolidado**
   - Recebe array de bubbleIds via POST
   - Valida array não vazio
   - Processa pontuações de cada bolão
   - Calcula pontuação total por usuário
   - Ordena por pontuação total
   - Retorna ranking consolidado com detalhes por bolão