import type { Metadata } from 'next';
import SignInContent from './SignInContent';

export const metadata: Metadata = {
  title: 'Sign In',
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <SignInContent />;
}
