"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GridBackground from "@/components/landing/ui/GridBackground";
import SectionReveal from "@/components/landing/ui/SectionReveal";
import TimelineItem from "@/components/landing/timeline/TimelineItem";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    date: "Step 01 — Connect Your Data",
    events: [
      "Securely connect your GitHub, projects, and learning platforms",
      "Velion AI analyzes repositories, commits, and technologies",
      "Automatically extracts skills, tools, and knowledge signals",
    ],
  },
  {
    date: "Step 02 — AI Skill Intelligence",
    events: [
      "Advanced AI models classify and evaluate your technical skills",
      "Builds relationships between skills, projects, and concepts",
      "Identifies strengths, weaknesses, and hidden potential",
    ],
  },
  {
    date: "Step 03 — 3D Knowledge Graph Generation",
    events: [
      "Transforms your skills into an interactive 3D intelligence graph",
      "Visualizes technologies as connected nodes in real-time space",
      "Explore your technical ecosystem in an immersive experience",
    ],
  },
  {
    date: "Step 04 — Growth Insights & Prediction",
    events: [
      "AI predicts future skill evolution and career trajectory",
      "Recommends high-impact skills to learn next",
      "Simulates how new skills reshape your intelligence graph",
    ],
  },
];


export default function RecruitmentTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spineActiveRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !spineActiveRef.current) return;

      gsap.set(spineActiveRef.current, {
        height: 0,
      });

      gsap.to(spineActiveRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full

        min-h-[120vh]

        bg-black

        px-6
        md:px-10
        lg:px-16

        py-32

        overflow-hidden
      "
    >
      <GridBackground />

      <div className="relative z-10 max-w-6xl mx-auto">
       <SectionReveal>
  <div className="text-center mb-24">
    <span
      className="
        text-xs
        uppercase
        tracking-[0.4em]
        text-white/40
      "
    >
      Velion AI Intelligence Flow
    </span>

    <h2
      className="
        mt-6

        text-3xl
        sm:text-4xl
        md:text-5xl
        lg:text-6xl

        font-semibold
        text-white
      "
    >
      Your Journey Into Technical Intelligence
    </h2>
  </div>
</SectionReveal>


        <div className="relative">
          {/* Static Spine */}
          <div
            className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2

            w-[2px]
            h-full

            bg-white/20
          "
          />

          {/* Active Spine */}
          <div
            ref={spineActiveRef}
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2

              w-[2px]

              bg-white

              origin-top
            "
          />

          {/* Timeline Items */}
          <div className="space-y-32">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.date}
                date={item.date}
                events={item.events}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
