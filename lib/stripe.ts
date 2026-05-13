import Stripe from 'stripe';

// Use the SDK's default API version (matches the version expected by the installed Stripe package)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
