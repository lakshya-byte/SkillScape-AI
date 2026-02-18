"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafActiveRef = useRef(true);

  useEffect(() => {
    /*
    ========================================
    Create Lenis instance with optimal settings
    ========================================
    */

    const lenis = new Lenis({
      duration: 1.1,

      easing: (t: number) =>
        1 - Math.pow(1 - t, 3),

      smoothWheel: true,

      smoothTouch: false,

      wheelMultiplier: 0.9,

      touchMultiplier: 1.5,

      infinite: false,
    });

    lenisRef.current = lenis;

    /*
    ========================================
    GSAP ticker integration (NO duplicate RAF)
    ========================================
    */

    const update = (time: number) => {
      if (rafActiveRef.current) {
        lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    gsap.ticker.fps(60);

    /*
    ========================================
    Sync ScrollTrigger with Lenis
    ========================================
    */

    lenis.on("scroll", ScrollTrigger.update);

    /*
    ========================================
    Pause engine when tab inactive
    HUGE performance gain
    ========================================
    */

    const visibilityHandler = () => {
      if (document.hidden) {
        rafActiveRef.current = false;
      } else {
        rafActiveRef.current = true;
      }
    };

    document.addEventListener(
      "visibilitychange",
      visibilityHandler
    );

    /*
    ========================================
    Optimize ScrollTrigger globally
    ========================================
    */

    ScrollTrigger.config({
      limitCallbacks: true,

      ignoreMobileResize: true,

      autoRefreshEvents:
        "visibilitychange,DOMContentLoaded,load",
    });

    /*
    ========================================
    Refresh once after init
    ========================================
    */

    ScrollTrigger.refresh();

    /*
    ========================================
    Cleanup
    ========================================
    */

    return () => {
      gsap.ticker.remove(update);

      document.removeEventListener(
        "visibilitychange",
        visibilityHandler
      );

      lenis.destroy();

      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
}
