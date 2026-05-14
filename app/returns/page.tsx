import { Metadata } from 'next';
import ReturnsContent from './ReturnsContent';

export const metadata: Metadata = {
  title: 'Returns & Guarantee | Dan Siam Amulets',
  description: '100% authenticity guarantee and returns policy for Dan Siam Amulets.',
};

export default function ReturnsPage() {
  return <ReturnsContent />;
}
