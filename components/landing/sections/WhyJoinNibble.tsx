"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyJoinNibbleCard from "@/components/landing/why-join-nibble/WhyJoinNibbleCard";

gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
  {
    title: "AI Skill Intelligence",
    description:
      "Analyze your GitHub and projects to automatically detect, classify, and evaluate your real-world technical skills.",
  },
  {
    title: "Interactive 3D Knowledge Graph",
    description:
      "Visualize your entire skill ecosystem as an immersive 3D intelligence graph with connected technologies and concepts.",
  },
  {
    title: "Discover Strengths & Skill Gaps",
    description:
      "Understand your true strengths, uncover hidden weaknesses, and gain deep insights into your technical intelligence.",
  },
  {
    title: "Predict Your Future Growth",
    description:
      "Simulate skill evolution, explore future learning paths, and accelerate your journey toward technical mastery.",
  },
];


export default function WhyJoinNibble() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  cardRefs.current = [];

  const setCardRef = (el: HTMLDivElement | null) => {
    if (el) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const cards = cardRefs.current;

    if (!cards.length) return;

    const ctx = gsap.context(() => {

      cards.forEach((card, index) => {

        const targetScale =
          1 - (cards.length - index - 1) * 0.12; // aggressive cinematic scale

        gsap.fromTo(
          card,
          {
            scale: 1,
          },
          {
            scale: targetScale,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );

      });

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
    >
      {CARD_DATA.map((card, index) => (
        <WhyJoinNibbleCard
          key={index}
          ref={setCardRef}
          index={index}
          total={CARD_DATA.length}
          title={card.title}
          description={card.description}
        />
      ))}
    </section>
  );
}
