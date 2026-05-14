import { Metadata } from 'next';
import ShippingContent from './ShippingContent';

export const metadata: Metadata = {
  title: 'Shipping Policy | Dan Siam Amulets',
  description: 'Shipping information for Dan Siam Amulets. Domestic and international shipping rates.',
};

export default function ShippingPage() {
  return <ShippingContent />;
}
