import React from 'react'
import Step0_Welcome from '@/components/auth/onboarding/steps/Step0_Welcome'
import { OnboardingProvider } from '@/components/auth/onboarding/OnboardingContext'
import Step1_Identity from '@/components/auth/onboarding/steps/Step1_Identity'
import Step2_Avatar from '@/components/auth/onboarding/steps/Step2_Avatar'
import Step3_Connections from '@/components/auth/onboarding/steps/Step3_Connections'
import Step4_Skills from '@/components/auth/onboarding/steps/Step4_Skills'
import Step5_Loader from '@/components/auth/onboarding/steps/Step5_Loader'

const page = () => {
  return (
    <div>
      <OnboardingProvider>
        <Step0_Welcome />  
        <Step1_Identity />
        <Step2_Avatar />
        <Step3_Connections />

         <Step4_Skills /> 
        <Step5_Loader />
      </OnboardingProvider> 
    </div>
  )
}

export default page