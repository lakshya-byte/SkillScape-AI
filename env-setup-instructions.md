# Environment Setup for Payment Integration

## Frontend (.env.local)
Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

## Backend (server/.env)
Add these to your existing `server/.env` file:

```
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

## Getting Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Generate a new key pair for test mode
5. Copy the Key ID and Key Secret

## Testing

- Use test credentials for development
- Razorpay provides test card numbers for testing payments
- No real money is charged in test mode
