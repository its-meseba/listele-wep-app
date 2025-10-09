import { Checkout } from "@polar-sh/nextjs";

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN || "polar_oat_05eeFJFKmiJaFrvFZHTyKMrlzPprwfFoNKe4S1VZmVo";
const POLAR_SUCCESS_URL = process.env.POLAR_SUCCESS_URL || "https://my-app.com/success?checkout_id={CHECKOUT_ID}";

export const GET = Checkout({
  accessToken: POLAR_ACCESS_TOKEN,
  successUrl: POLAR_SUCCESS_URL,
  server: "sandbox", // Use sandbox for testing
});
