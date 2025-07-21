# Repository Split Guide

## Current State
Your codebase has been restructured to support a clean public/private split.

## Files for PUBLIC repo (Frontend/UI):
```
src/
├── components/          # All UI components
├── pages/              # All pages
├── hooks/              # Basic hooks (location, mobile)
├── services/
│   ├── api.ts          # Public API client
│   └── fallbackService.ts  # Basic fallback logic
├── assets/             # Images and static files
├── index.css           # Styling
├── types/              # TypeScript interfaces
└── lib/                # Utilities

# Config files
tailwind.config.ts
vite.config.ts
package.json
README.md
```

## Files for PRIVATE repo (Backend API):
Create a new Node.js/Express API project with:
```
api/
├── routes/
│   ├── ai.js           # /api/ai/* endpoints
│   ├── restaurants.js  # /api/restaurants/* endpoints
│   └── usage.js        # /api/usage/* endpoints
├── services/
│   ├── aiService.js    # Your current aiService.ts
│   ├── enhancedAiService.js  # Your enhanced AI logic
│   ├── restaurantService.js  # Restaurant finding logic
│   └── usageTracking.js     # Monetization logic
└── data/
    ├── quizData.js     # Question templates
    └── swipeData.js    # Content strategy
```

## Steps to Split:

### 1. Create Private API Repo
1. Create new Node.js project
2. Copy sensitive files from current repo
3. Create API endpoints that match the `PublicAPIClient` interface
4. Deploy to Vercel/Railway/your preferred platform

### 2. Update Public Repo
1. Remove sensitive files:
   - `src/services/aiService.ts`
   - `src/services/enhancedAiService.ts`
   - `src/services/restaurantService.ts`
   - `src/hooks/useUsageTracking.ts`
   - `src/data/quizData.ts`
   - `src/data/swipeData.ts`
2. Update API_BASE_URL in `src/services/api.ts` to point to your deployed API
3. Test that fallback service works when API is unavailable

### 3. Environment Variables
In your public repo, set:
```
VITE_API_URL=https://your-private-api.vercel.app
```

## Benefits of This Architecture:
- ✅ Clean separation of concerns
- ✅ Public repo showcases UI skills
- ✅ Private repo protects your algorithms
- ✅ Graceful fallbacks when API is down
- ✅ Easy to scale and maintain
- ✅ Can open-source the UI part safely

## Next Steps:
1. Create the private API repo
2. Implement the API endpoints
3. Deploy the private API
4. Update the public repo's API URL
5. Test end-to-end functionality