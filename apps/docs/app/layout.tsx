import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LayerOne Docs',
  description: 'Documentation for the LayerOne design system.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" data-brand="default" data-density="comfortable">
      <body>{children}</body>
    </html>
  );
}
