"use client";

import React from "react";
import { useOnboarding } from "./OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";

/**
 * Bridges context (step/totalSteps) → visual layout (OnboardingLayout).
 * Used inside the route layout so OnboardingLayout doesn't need to
 * consume the context directly.
 */
export default function OnboardingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { step, totalSteps } = useOnboarding();

  return (
    <OnboardingLayout step={step} totalSteps={totalSteps}>
      {children}
    </OnboardingLayout>
  );
}
