import { OnboardingProvider } from "@/components/auth/onboarding/OnboardingContext";
import OnboardingShell from "@/components/auth/onboarding/OnboardingShell";

export const metadata = {
  title: "Onboarding — VelionAI",
  description: "Set up your VelionAI workspace",
};

export default function OnboardingRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <OnboardingShell>{children}</OnboardingShell>
    </OnboardingProvider>
  );
}
