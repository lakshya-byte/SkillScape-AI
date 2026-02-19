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

  // Unified Premium Theme (Purple-based)
  const theme = {
    border: 'border-purple-500/20',
    borderHover: 'group-hover:border-purple-500/50',
    bg: 'from-purple-500/5',
    shadow: 'shadow-purple-500/10',
    shadowHover: 'group-hover:shadow-purple-500/30',
    accent: 'text-purple-400',
    accentFill: 'fill-purple-400/20',
    btn: 'bg-linear-to-r from-violet-600 to-indigo-600',
    btnHover: 'hover:shadow-indigo-500/40'
  };

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
        credentials: 'include',
        body: JSON.stringify({
          amount: priceValue, // Backend will convert to paise
        }),
      });

      const orderData = await response.json();

      if (!response.ok || !orderData.success) {
        console.error('Order creation failed:', orderData);
        alert(`Something went wrong: ${orderData.message || 'Please try again.'}`);
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
            credentials: 'include',
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            alert('Payment Successful!');
            // You might want to redirect to a success page or reload user data
          } else {
            console.error('Payment verification failed:', verifyData);
            alert(`Payment Verification Failed: ${verifyData.message || 'Please contact support.'}`);
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
      className="relative group flex flex-col h-full transition-all duration-500 hover:scale-[1.02] z-0 hover:z-10"
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 flex justify-center -mt-4 z-30">
          <span className="bg-linear-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/40 border border-white/20">
            Most Popular
          </span>
        </div>
      )}

      {/* Main Card Container */}
      <div className={`relative flex flex-col h-full rounded-[32px] overflow-hidden border transition-all duration-500 bg-[#0A0A0F]/90 ${theme.border} ${theme.borderHover} ${theme.shadow} ${theme.shadowHover}`}>

        {/* Background Glow Effect */}
        <div className={`absolute inset-0 bg-linear-to-b ${theme.bg} to-transparent pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-100`} />

        {/* Top Accent Rim */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent opacity-50 z-20" />

        <div className="p-8 flex flex-col h-full relative z-10">

          {/* Header */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
              {tier.name}
              {isPopular && <Sparkles size={16} className={`${theme.accent} ${theme.accentFill} animate-pulse`} />}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed min-h-[40px] group-hover:text-slate-400 transition-colors">
              {tier.description}
            </p>
          </div>

          {/* Price Display */}
          <div className="mb-8 flex items-end gap-1">
            <div className="text-4xl font-bold text-white tracking-tight flex items-start">
              <span className="text-lg text-slate-500 mt-1 mr-1">₹</span>
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
          <div className="h-px w-full mb-8 bg-linear-to-r from-transparent via-purple-500/20 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />

          {/* Features List */}
          <ul className="space-y-4 mb-8 grow">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400 group/item">
                <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="group-hover/item:text-slate-200 transition-colors">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handlePayment}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${theme.btn} text-white shadow-lg shadow-indigo-500/25 ${theme.btnHover} hover:scale-[1.02]`}
          >
            {tier.cta}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

        </div>
      </div>
    </motion.div>
  );
}
