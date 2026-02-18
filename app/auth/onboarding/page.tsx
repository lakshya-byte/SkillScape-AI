import React from 'react'
import Step0_Welcome from '@/components/auth/onboarding/steps/Step0_Welcome'
import { OnboardingProvider } from '@/components/auth/onboarding/OnboardingContext'
import Step1_Identity from '@/components/auth/onboarding/steps/Step1_Identity'
import Step2_Avatar from '@/components/auth/onboarding/steps/Step2_Avatar'

const page = () => {
  return (
    <div>
      <OnboardingProvider>
        {/* <Step0_Welcome /> */}
        {/* <Step1_Identity /> */}
        <Step2_Avatar />
      </OnboardingProvider> 
    </div>
  )
}

export default page