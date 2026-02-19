'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  glowColor?: string;
}

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: 'monthly' | 'yearly';
  index: number;
}

export default function PricingCard({ tier, billingCycle, index }: PricingCardProps) {
  const isPopular = tier.popular;
  const priceValue = billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const res = await loadRazorpay();

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // 1. Create order on backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: priceValue,
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        alert('Something went wrong. Please try again.');
        return;
      }

      const { data: order } = orderData;

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SkillScape AI',
        description: `Subscription for ${tier.name} plan`,
        image: '/logo.png', // Add your logo path here
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/payments/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert('Payment Successful!');
          } else {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: '', // You can prefill user data if available from auth context
          email: '',
          contact: '',
        },
        notes: {
          address: 'SkillScape AI Corporate Office',
        },
        theme: {
          color: '#8b5cf6', // purple-500
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment Error:', error);
      alert('An error occurred during payment.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group flex flex-col h-full rounded-[32px] overflow-hidden transition-transform duration-500 ${isPopular
        ? 'bg-[#0F0F16]/90 border border-purple-500/50 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)] scale-105 z-10'
        : 'bg-[#0A0A0F]/80 border border-white/5 hover:border-white/10 hover:bg-[#0A0A0F]/90 z-0'
        }`}
    >
      {/* ... previous content ... */}
      {/* 1. "Most Popular" Badge (Conditional) */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
          <span className="bg-linear-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/40 border border-white/20 z-20">
            Most Popular
          </span>
        </div>
      )}

      {/* 2. Top Lighting Effect (Ambient Glow) */}
      <div className={`absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-${tier.glowColor || 'white'}/20 to-transparent opacity-50`} />

      <div className="p-8 flex flex-col h-full relative z-10">

        {/* Header */}
        <div className="mb-6">
          <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${isPopular ? 'text-white' : 'text-slate-200'}`}>
            {tier.name}
            {isPopular && <Sparkles size={16} className="text-purple-400 fill-purple-400/20 animate-pulse" />}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">
            {tier.description}
          </p>
        </div>

        {/* Price Display (Animated) */}
        <div className="mb-8 flex items-end gap-1">
          <div className="text-4xl font-bold text-white tracking-tight flex items-start">
            <span className="text-lg text-slate-500 mt-1 mr-1">$</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={priceValue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {priceValue}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-sm text-slate-500 mb-1 font-medium">/mo</span>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-8 ${isPopular ? 'bg-linear-to-r from-transparent via-purple-500/30 to-transparent' : 'bg-white/5'}`} />

        {/* Features List */}
        <ul className="space-y-4 mb-8 grow">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-400 group/item">
              <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-slate-500'
                }`}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className="group-hover/item:text-slate-200 transition-colors">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={handlePayment}
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${isPopular
            ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]'
            : 'bg-white/5 text-white hover:bg-white/10 border border-white/5 hover:border-white/10'
            }`}>
          {tier.cta}
          <ArrowRight size={16} className={`transition-transform duration-300 ${isPopular ? 'group-hover/btn:translate-x-1' : 'opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2'}`} />
        </button>

      </div>

      {/* Background Gradient (Subtle) */}
      {isPopular && (
        <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}
