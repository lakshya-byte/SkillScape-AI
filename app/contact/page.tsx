import Hero from "@/components/Contact/Hero";
import NewForm from "@/components/Contact/NewForm";
import DirectContact from "@/components/Contact/DirectContact";
import Collaboration from "@/components/Contact/Collaboration";
import FinalCall from "@/components/Contact/FinalCall";

export default function ContactPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen">
      <Hero />
      <NewForm />
      <DirectContact />
      <Collaboration />
      <FinalCall />
    </main>
  );
}