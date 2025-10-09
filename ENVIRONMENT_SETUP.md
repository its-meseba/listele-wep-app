# Environment Variables Setup Guide

## For Polar.sh Payment Integration

### Option 1: Create .env.local file (Recommended for Production)

Create a `.env.local` file in your project root with:

```env
# Polar.sh Configuration
POLAR_ACCESS_TOKEN=polar_oat_05eeFJFKmiJaFrvFZHTyKMrlzPprwfFoNKe4S1VZmVo
POLAR_SUCCESS_URL=https://my-app.com/success?checkout_id={CHECKOUT_ID}

# App Configuration
NEXT_PUBLIC_APP_URL=https://my-app.com

# Payment System
NEXT_PUBLIC_PAYMENT_ENABLED=true
```

### Option 2: Environment Variables in Vercel/Netlify/etc.

Set these environment variables in your hosting platform:

- `POLAR_ACCESS_TOKEN`: `polar_oat_05eeFJFKmiJaFrvFZHTyKMrlzPprwfFoNKe4S1VZmVo`
- `POLAR_SUCCESS_URL`: `https://my-app.com/success?checkout_id={CHECKOUT_ID}`
- `NEXT_PUBLIC_APP_URL`: `https://my-app.com`
- `NEXT_PUBLIC_PAYMENT_ENABLED`: `true`

### Option 3: Hardcoded (Current Setup - For Development Only)

The current setup uses hardcoded values as fallbacks:

```typescript
const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN || "polar_oat_05eeFJFKmiJaFrvFZHTyKMrlzPprwfFoNKe4S1VZmVo";
const POLAR_SUCCESS_URL = process.env.POLAR_SUCCESS_URL || "https://my-app.com/success?checkout_id={CHECKOUT_ID}";
```

### Current Status

✅ **Payments are ENABLED** with fallback values
✅ **Success URL**: `https://my-app.com/success`
✅ **Access Token**: Set to your provided token
✅ **Sandbox Mode**: Enabled for testing

### Test URLs

With the current setup, you can test:

```
http://localhost:3000/api/polar/checkout?products=starter-lifetime&customer_email=your-email@example.com
```

### For Production

1. Set up proper environment variables
2. Create products in Polar dashboard with IDs:
   - `starter-lifetime`
   - `professional-lifetime`
   - `enterprise-lifetime`
3. Update success URL to match your domain
4. Switch from sandbox to production in `src/app/api/polar/checkout/route.ts`

