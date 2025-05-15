# Visão Geral do Projeto

## Nome
League Process Get Ranking

## Descrição
Serviço responsável por processar e retornar rankings e pontuações de usuários em ligas e bolões do sistema Craque. O serviço oferece endpoints para consultar pontuações individuais por bolão, por liga e rankings consolidados baseados em múltiplos bolões.

## Principais Funcionalidades
- Consulta de pontuações de usuários por bolão (bubbleId)
- Consulta de pontuações de usuários por liga (leagueId)
- Cálculo de ranking consolidado baseado em múltiplos bolões
- Logging de estados de processamento para monitoramento

## Stack Tecnológica
- Node.js 18.x
- AWS Lambda
- Serverless Framework
- MongoDB (para armazenamento de dados)
- Serverless Offline (para desenvolvimento local)

## Estrutura do Repositório
```
.
├── domain/           # Lógica de negócio e regras do domínio
├── infrastructure/   # Configurações de infraestrutura
├── utils/           # Utilitários e helpers
├── handler.js       # Ponto de entrada das funções Lambda
├── serverless.yml   # Configuração do Serverless Framework
└── package.json     # Dependências do projeto
```

## Variáveis de Ambiente
- `MONGODB_URI`: URI de conexão com o MongoDB
- `NODE_ENV`: Ambiente de execução (development/production)
- `LOG_LEVEL`: Nível de log do sistema