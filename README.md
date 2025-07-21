# What Should We Eat - Core API

Private backend API for the What Should We Eat application.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```

3. **Required API Keys**:
   - OpenAI API key for AI recommendations
   - Google Maps API key for restaurant search

## Development

```bash
npm run dev
```

This starts the Vercel development server at `http://localhost:3000`

## API Endpoints

### POST /api/recommend
Generate food recommendations based on user answers.

**Request body**:
```json
{
  "answers": {
    "spice-level": "left",
    "meal-size": "right"
  }
}
```

### POST /api/restaurants
Find nearby restaurants based on location and cuisine.

**Request body**:
```json
{
  "cuisineType": "italian",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "preferences": {
    "radius": 5000
  }
}
```

### POST /api/generate-question
Generate dynamic quiz questions using AI.

**Request body**:
```json
{
  "previousAnswers": {},
  "questionIndex": 1
}
```

### POST /api/track-usage
Track user sessions for analytics.

**Request body**:
```json
{
  "sessionData": {
    "sessionId": "session_123",
    "answers": {},
    "timestamp": 1234567890
  }
}
```

## Deployment

Deploy to Vercel:
```bash
npm run deploy
```

## Project Structure

```
├── api/                 # Vercel serverless functions
│   ├── recommend.ts
│   ├── restaurants.ts
│   └── generate-question.ts
├── src/
│   ├── services/        # Business logic
│   ├── data/           # Static data
│   ├── types/          # TypeScript interfaces
│   └── hooks/          # Reusable logic
└── .env.example        # Environment variables template
```

## Security

- All API keys are stored in environment variables
- CORS is configured for the public UI domain only
- Rate limiting is implemented for API endpoints
