'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingToggle from './PricingToggle';
import PricingCard from './PricingCard';
import TrustedBy from './TrustedBy';
import { PRICING_TIERS, BillingCycle } from './PricingData';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section className="relative min-h-screen bg-[#050507] py-24 md:py-32 selection:bg-purple-500/30">

      {/* 1. Ambient Background Effects (The "God Rays") */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* 2. Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            V2.0 NEURAL ARCHITECTURE LIVE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl md:leading-tight font-bold text-white tracking-tight mb-6"
          >
            Initialize Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-violet-400 to-indigo-400">
              Intelligence Stack
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            Choose the computational power required to architect the future.
            Upgrade your neural capacity today.
          </motion.p>
        </div>

        {/* 3. Controls (Toggle) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <PricingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
        </motion.div>

        {/* 4. The Grid (Pricing Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 items-start">
          {PRICING_TIERS.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              index={index}
            />
          ))}
        </div>

      </div>

      {/* 5. Footer Trust Section */}
      <div className="mt-24 md:mt-32">
        <TrustedBy />
      </div>

    </section>
  );
}