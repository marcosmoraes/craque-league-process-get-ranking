# Processo de Desenvolvimento

## Ambiente de Desenvolvimento
### Pré-requisitos
- Node.js 18.x
- MongoDB
- Serverless Framework CLI
- Conta AWS (para deploy)

### Configuração Local
1. Clone o repositório
2. Instale dependências: `npm install`
3. Configure variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais
   ```
4. Inicie o ambiente local:
   ```bash
   serverless offline
   ```

## Workflow de Desenvolvimento
1. Crie uma branch para sua feature
2. Implemente as mudanças
3. Teste localmente usando serverless offline
4. Faça commit das alterações
5. Crie um Pull Request
6. Após aprovação, faça merge para main

## Testes
### Testes Locais
- Use o endpoint local: `http://localhost:3003`
- Teste cada endpoint com diferentes cenários
- Verifique logs de processamento

### Exemplos de Testes
```bash
# Teste getUserPoints
curl -X POST http://localhost:3003/get-user-points \
  -H "Content-Type: application/json" \
  -d '{"bubbleId": "123"}'

# Teste getUserPointsByLeague
curl -X POST http://localhost:3003/get-user-points-by-league \
  -H "Content-Type: application/json" \
  -d '{"leagueId": "456"}'

# Teste getUserRankingByBubbleIds
curl -X POST http://localhost:3003/get-user-ranking-by-bubble-ids \
  -H "Content-Type: application/json" \
  -d '{"bubbleIds": ["123", "456"]}'
```

## Monitoramento
- Logs de processamento em `utils/log-processing-state.js`
- CloudWatch para logs em produção
- Métricas de performance:
  - Tempo de resposta
  - Taxa de erro
  - Uso de memória

## Manutenção
### Rotinas
- Monitorar logs de processamento
- Verificar performance dos endpoints
- Atualizar dependências periodicamente
- Revisar configurações de timeout

### Troubleshooting
1. Verificar logs de processamento
2. Validar conexão com MongoDB
3. Confirmar parâmetros de entrada
4. Verificar timeout em operações longas