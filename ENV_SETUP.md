# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Polar.sh Configuration
POLAR_ACCESS_TOKEN=polar_oat_05eeFJFKmiJaFrvFZHTyKMrlzPprwfFoNKe4S1VZmVo
POLAR_SUCCESS_URL=https://listelee.vercel.app/success?checkout_id={CHECKOUT_ID}

# App Configuration
NEXT_PUBLIC_APP_URL=https://listelee.vercel.app

# Payment System
NEXT_PUBLIC_PAYMENT_ENABLED=true
```

## Current Status

✅ **Payments are currently ENABLED** for testing purposes
- Located in `src/lib/config.ts`
- Set to return `true` by default
- Remember to set back to environment variable check when deploying

## When Ready for Production

1. Create `.env.local` with the variables above
2. Update `src/lib/config.ts` to use environment variables instead of hardcoded `true`
3. Set up your Polar.sh products with the correct product IDs in `src/lib/plans.ts`

