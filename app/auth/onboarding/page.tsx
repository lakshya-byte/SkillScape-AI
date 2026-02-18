import { redirect } from "next/navigation";

// Legacy route — redirect to the new route-based onboarding
export default function LegacyOnboardingPage() {
  redirect("/onboarding/welcome");
}
