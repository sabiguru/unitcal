import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CalcFort - Get Support for Calculator Tools',
  description: 'Contact CalcFort for support, feedback, or questions about our free online calculators. We\'re here to help with any calculator-related inquiries.',
  alternates: {
    canonical: 'https://calcfort.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}