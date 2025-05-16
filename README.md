# League Process Get Ranking

Service responsible for processing and returning user rankings and points in leagues and pools of the Craque system.

## 🚀 Technologies

- Node.js 18.x
- MongoDB
- Serverless Framework
- AWS Lambda
- Serverless Offline

## 📋 Prerequisites

- Node.js 18.x
- MongoDB
- Serverless Framework CLI
- AWS Account (for deployment)

## 🔧 Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit the .env file with your credentials
```

4. Run locally
```bash
serverless offline
```

## 📚 Documentation

Complete project documentation is available in the `docs/` folder:

- [Overview](docs/00-project-overview.md)
- [Architecture](docs/01-architecture.md)
- [Components](docs/02-components.md)
- [Development Process](docs/03-development-process.md)
- [API](docs/04-api-documentation.md)
- [Progress Log](docs/05-progress-log.md)

## 🛠️ Development

### Useful Commands

- Local development: `serverless offline`
- Dev deployment: `serverless deploy --stage dev`
- Prod deployment: `serverless deploy --stage prod`

### Endpoints

- `POST /get-user-points`: Returns points by pool
- `POST /get-user-points-by-league`: Returns points by league
- `POST /get-user-ranking-by-bubble-ids`: Returns consolidated ranking

## 📝 License

This project is licensed under the [MIT](LICENSE) license.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request