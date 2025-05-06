# League Process Get Ranking

Este serviço é responsável por obter e processar o ranking dos usuários por liga no sistema Craque. Ele fornece endpoints para consultar pontos de usuários e rankings baseados em diferentes critérios.

## 🚀 Tecnologias

- Node.js 18.x
- Serverless Framework
- AWS Lambda
- MongoDB (via Mongoose)
- Jest (para testes)
- Prometheus Client (para métricas)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- Serverless Framework CLI
- AWS CLI configurado
- MongoDB

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
MONGODB_URI=sua_uri_do_mongodb
AWS_REGION=sua_regiao_aws
```

## 🏃‍♂️ Executando o projeto

### Desenvolvimento local
```bash
npm run dev
```
O servidor será iniciado na porta 3003.

### Deploy
```bash
serverless deploy
```

## 📡 Endpoints

### 1. Get User Points
- **Endpoint**: POST /get-user-points
- **Body**:
```json
{
    "bubbleId": "string"
}
```

### 2. Get User Points by League
- **Endpoint**: POST /get-user-points-by-league
- **Body**:
```json
{
    "leagueId": "string"
}
```

### 3. Get User Ranking by Bubble IDs
- **Endpoint**: POST /get-user-ranking-by-bubble-ids
- **Body**:
```json
{
    "bubbleIds": ["string"]
}
```

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📊 Monitoramento

O serviço utiliza o Prometheus Client para coletar métricas de performance e monitoramento.

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.
