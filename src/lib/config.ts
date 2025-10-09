export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://my-app.com';

export const isPaymentEnabled = () => {
  // Temporarily enabled for testing
  return true;
  // return process.env.NEXT_PUBLIC_PAYMENT_ENABLED === 'true';
}; 