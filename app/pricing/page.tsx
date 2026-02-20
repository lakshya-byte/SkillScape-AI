import React from 'react';
import type { Metadata } from 'next';
import PricingSection from '@/components/pricing/PricingSection';

export const metadata: Metadata = {
  title: 'Pricing • Velion AI',
  description: 'Choose the computational power required to architect the future. Upgrade your neural capacity today.',
};

export default function PricingPage() {
  return (
    <main className="bg-[#050507] min-h-screen">
      {/* The PricingSection handles its own internal layout and background effects.
        We just mount it here as the primary content of the route.
      */}
      <PricingSection />
    </main>
  );
}