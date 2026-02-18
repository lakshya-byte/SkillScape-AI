'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the Shape of the Data
// This ensures all components know exactly what "User Data" looks like.
type UserData = {
  name: string;
  email: string;
  org: string;
  avatarId: string | null;
  skills: string[];
};

// 2. Define the Context Interface
// This lists everything available to the child components.
type OnboardingContextType = {
  step: number;
  userData: UserData;
  setStep: (step: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isStepValid: () => boolean; // Helper to check if current step is complete
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// 3. The Provider Component
// This wraps the entire app and provides the state.
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0); // Start at Step 0 (Welcome)
  
  // Initialize empty state
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    org: '',
    avatarId: null,
    skills: [],
  });

  // Helper to update specific fields without overwriting the whole object
  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Navigation Logic
  const nextStep = () => setStep(prev => Math.min(prev + 1, 5)); // Cap at max steps
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0)); // Cap at 0

  // Validation Logic (Optional helper to disable "Next" buttons)
  const isStepValid = () => {
    switch (step) {
      case 1: return !!userData.name && !!userData.email; // Identity Step
      case 2: return !!userData.avatarId; // Avatar Step
      case 3: return userData.skills.length > 0; // Skills Step
      default: return true;
    }
  };

  return (
    <OnboardingContext.Provider value={{ 
      step, 
      userData, 
      setStep, 
      updateUserData, 
      nextStep, 
      prevStep,
      isStepValid 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

// 4. Custom Hook
// This makes using the context easier: `const { step } = useOnboarding();`
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};