"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, memo } from "react";

// Dynamic import with no SSR and no preload
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Controls whether spline exists in DOM
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);

  // Track visibility state without causing re-renders
  const visibleRef = useRef(false);

  useEffect(() => {
    // -------- DEVICE PERFORMANCE DETECTION --------

    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    const deviceMemory = (navigator as any).deviceMemory || 4;

    const lowEnd =
      hardwareConcurrency <= 4 ||
      deviceMemory <= 4 ||
      window.devicePixelRatio > 2;

    if (lowEnd) return; // never load spline on low-end

    const container = containerRef.current;
    if (!container) return;

    // -------- INTERSECTION OBSERVER --------

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;

        // mount/unmount spline based on visibility
        if (entry.isIntersecting) {
          setShouldRenderSpline(true);
        } else {
          setShouldRenderSpline(false);
        }
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "200px", // preload slightly before visible
      },
    );

    observer.observe(container);

    // -------- TAB VISIBILITY CONTROL --------

    const visibilityHandler = () => {
      if (document.hidden) {
        setShouldRenderSpline(false);
      } else if (visibleRef.current) {
        setShouldRenderSpline(true);
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler);

    // -------- CLEANUP --------

    return () => {
      observer.disconnect();

      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        absolute inset-0 z-0
        w-full h-full
        overflow-hidden
        bg-black
        select-none
        will-change-transform
        transform-gpu
      "
    >
      {/* -------- SPLINE LAYER -------- */}

      {shouldRenderSpline && (
        <div
          className="
              absolute inset-0
              w-full h-full
              transform-gpu
              will-change-transform
            "
        >
          <Spline
            scene="https://prod.spline.design/q7NUhUBbLZDl0m1s/scene.splinecode"
            className="!w-full !h-full"
          />
        </div>
      )}

      {/* -------- STATIC FALLBACK -------- */}

      <div
        className="
          absolute inset-0
          flex items-center justify-center
          pointer-events-none
        "
      >
        <div className="w-[260px] h-[260px] bg-blue-900/20 rounded-full blur-xl" />
      </div>

      {/* -------- VIGNETTE -------- */}

      <div
        className="
          absolute inset-0
          pointer-events-none
          bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.75)_95%)]
        "
      />

      {/* -------- TOP GRADIENT -------- */}

      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* -------- BOTTOM GRADIENT -------- */}

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}

// Prevent React re-renders entirely
export default memo(HeroBackground);
