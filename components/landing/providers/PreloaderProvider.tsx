"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PreloaderContextType = {
  isLoading: boolean;
  setLoadingComplete: () => void;
};

const PreloaderContext = createContext<PreloaderContextType>({
  isLoading: true,
  setLoadingComplete: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export default function PreloaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  // FIX: define function BEFORE useEffect
  const setLoadingComplete = useCallback(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete();
    }, 1400);

    return () => clearTimeout(timer);
  }, [setLoadingComplete]);

  return (
    <PreloaderContext.Provider
      value={{
        isLoading,
        setLoadingComplete,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}
