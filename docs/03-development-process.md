# Development Process

## Development Environment
### Prerequisites
- Node.js 18.x
- MongoDB
- Serverless Framework CLI
- AWS Account (for deployment)

### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit the .env file with your credentials
   ```
4. Start local environment:
   ```bash
   serverless offline
   ```

## Development Workflow
1. Create a branch for your feature
2. Implement changes
3. Test locally using serverless offline
4. Commit changes
5. Create a Pull Request
6. After approval, merge to main

## Testing
### Local Testing
- Use local endpoint: `http://localhost:3003`
- Test each endpoint with different scenarios
- Check processing logs

### Test Examples
```bash
# Test getUserPoints
curl -X POST http://localhost:3003/get-user-points \
  -H "Content-Type: application/json" \
  -d '{"bubbleId": "123"}'

# Test getUserPointsByLeague
curl -X POST http://localhost:3003/get-user-points-by-league \
  -H "Content-Type: application/json" \
  -d '{"leagueId": "456"}'

# Test getUserRankingByBubbleIds
curl -X POST http://localhost:3003/get-user-ranking-by-bubble-ids \
  -H "Content-Type: application/json" \
  -d '{"bubbleIds": ["123", "456"]}'
```

## Monitoring
- Processing logs in `utils/log-processing-state.js`
- CloudWatch for production logs
- Performance metrics:
  - Response time
  - Error rate
  - Memory usage

## Maintenance
### Routines
- Monitor processing logs
- Check endpoint performance
- Update dependencies periodically
- Review timeout settings

### Troubleshooting
1. Check processing logs
2. Validate MongoDB connection
3. Confirm input parameters
4. Check timeout in long operations