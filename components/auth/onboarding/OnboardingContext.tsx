"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

// ─── Route Order ────────────────────────────────────────────────
const ONBOARDING_ROUTES = [
  "/onboarding/welcome",
  "/onboarding/identity",
  "/onboarding/avatar",
  "/onboarding/connections",
  "/onboarding/skills",
  "/onboarding/loader",
  "/onboarding/complete",
] as const;

export const TOTAL_STEPS = ONBOARDING_ROUTES.length;

// ─── Types ──────────────────────────────────────────────────────
type Links = {
  github: string;
  linkedin: string;
  leetcode: string;
  behance: string;
};

type UserData = {
  name: string;
  email: string;
  password: string;
  institute: string;
  avatarId: string | null;
  skills: string[];
  links: Links;
};

type OnboardingContextType = {
  step: number;
  totalSteps: number;
  userData: UserData;
  setStep: (step: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isStepValid: () => boolean;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

// ─── Provider ───────────────────────────────────────────────────
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Derive current step index from the URL
  const step = useMemo(() => {
    const index = ONBOARDING_ROUTES.indexOf(
      pathname as (typeof ONBOARDING_ROUTES)[number],
    );
    return index >= 0 ? index : 0;
  }, [pathname]);

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    institute: "",
    avatarId: null,
    skills: [],
    links: { github: "", linkedin: "", leetcode: "", behance: "" },
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  // Route-based navigation
  const nextStep = () => {
    const nextIndex = Math.min(step + 1, ONBOARDING_ROUTES.length - 1);
    router.push(ONBOARDING_ROUTES[nextIndex]);
  };

  const prevStep = () => {
    const prevIndex = Math.max(step - 1, 0);
    router.push(ONBOARDING_ROUTES[prevIndex]);
  };

  // Jump to a specific step by index
  const setStep = (target: number) => {
    const clamped = Math.max(0, Math.min(target, ONBOARDING_ROUTES.length - 1));
    router.push(ONBOARDING_ROUTES[clamped]);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!userData.name && !!userData.email && !!userData.password;
      case 2:
        return !!userData.avatarId;
      case 4:
        return userData.skills.length > 0;
      default:
        return true;
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        totalSteps: TOTAL_STEPS,
        userData,
        setStep,
        updateUserData,
        nextStep,
        prevStep,
        isStepValid,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
