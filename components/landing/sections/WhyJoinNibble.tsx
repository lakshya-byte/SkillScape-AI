"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyJoinNibbleCard from "@/components/landing/why-join-nibble/WhyJoinNibbleCard";

gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
  {
    title: "Build Real Systems",
    description:
      "Work on production-grade platforms used by real users. Engineer systems that scale.",
  },
  {
    title: "Elite Engineering Culture",
    description:
      "Collaborate with highly driven engineers obsessed with performance and quality.",
  },
  {
    title: "Create Cinematic Interfaces",
    description:
      "Build Awwwards-level interactive experiences using modern frontend technologies.",
  },
  {
    title: "Accelerate Your Growth",
    description:
      "Develop real-world engineering skills and become industry-ready.",
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
