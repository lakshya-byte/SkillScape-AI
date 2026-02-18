"use client";

import { forwardRef } from "react";

type WhyJoinNibbleCardProps = {
  title: string;
  description: string;
  index: number;
  total: number;
};

const WhyJoinNibbleCard = forwardRef<
  HTMLDivElement,
  WhyJoinNibbleCardProps
>(({ title, description, index, total }, ref) => {
  
  return (
    // Card Block (provides scroll space)
    <div className="relative h-screen w-full">

      {/* Sticky Card */}
      <div
        ref={ref}
        className="sticky top-1/2 will-change-transform"
        style={{
          transform: "translateY(-50%) scale(1)",
          zIndex: total - index,
        }}
      >
        {/* Card UI */}
        <div
          className="
            mx-auto
            w-full
            max-w-4xl
            h-[420px]

            rounded-3xl

            bg-gradient-to-br
            from-white/[0.08]
            to-white/[0.02]

            backdrop-blur-xl

            border
            border-white/[0.08]

            shadow-[0_40px_120px_rgba(0,0,0,0.8)]

            p-12

            flex
            flex-col
            justify-center

            will-change-transform
          "
        >
          {/* Title */}
          <h3
            className="
              text-4xl
              md:text-5xl
              font-semibold
              text-white
              mb-6
              tracking-tight
            "
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="
              text-white/60
              text-lg
              md:text-xl
              leading-relaxed
              max-w-xl
            "
          >
            {description}
          </p>

        </div>
      </div>

    </div>
  );
});

WhyJoinNibbleCard.displayName = "WhyJoinNibbleCard";

export default WhyJoinNibbleCard;
