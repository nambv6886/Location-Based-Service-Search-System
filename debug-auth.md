# Authentication Debug Guide

## Steps to Debug Your Authentication Issue

### 1. Check Environment Variables
Make sure you have these environment variables set in your `.env` file:
```env
JWT_SECRET_KEY=your-secret-key-here
JWT_ACCESS_TOKEN_EXPIRES_TIME=3600s
JWT_REFRESH_TOKEN_EXPIRES_TIME=7d
REDIS_URL=redis://localhost:6379
```

### 2. Test the Login Flow
1. Start your application: `npm run start:dev`
2. Go to `http://localhost:3000/api/docs`
3. Use the `/auth/login` endpoint to get a JWT token
4. Check the console logs for any errors

### 3. Test with the Token
1. Copy the `accessToken` from the login response
2. In Swagger, click the "Authorize" button (🔒)
3. Enter: `Bearer your-access-token-here`
4. Try to access a protected endpoint like `GET /users`

### 4. Check Console Logs
Look for these debug messages in your console:
- `JWT Guard - Authorization header: Bearer ...`
- `AuthService - Checking token deactivation for: Bearer ...`
- `JWT Strategy - Payload received: {...}`
- `JWT Strategy - User found: Yes/No`

### 5. Common Issues and Solutions

#### Issue: "No authorization header"
**Solution**: Make sure you're adding the token in Swagger's Authorize button, not in the request body.

#### Issue: "Token does not start with Bearer"
**Solution**: In Swagger, enter the token as: `Bearer your-token-here` (not just `your-token-here`)

#### Issue: "User not found"
**Solution**: Check if the user exists in your database and is active (`isActive: true`)

#### Issue: "Token verification result: false"
**Solution**: Check your `JWT_SECRET_KEY` environment variable

#### Issue: Redis connection errors
**Solution**: Make sure Redis is running and `REDIS_URL` is correct

### 6. Quick Test Commands

Test if Redis is working:
```bash
redis-cli ping
```

Test if your JWT secret is working:
```bash
node -e "console.log(process.env.JWT_SECRET_KEY)"
```

### 7. Remove Debug Logs
Once you've identified the issue, remove the `console.log` statements from:
- `src/modules/auth/jwt.strategy.ts`
- `src/common/guards/jwt-auth.guard.ts`
- `src/modules/auth/auth.service.ts`
