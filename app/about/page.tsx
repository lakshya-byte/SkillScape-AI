import Problem from "@/components/About/Problem";
import Importance from "@/components/About/Importance";
import Solution from "@/components/About/Solution";
import Unique from "@/components/About/Unique";
import Impact from "@/components/About/Impact";

export default function Page() {
  return (
    <main className="bg-background-dark text-white min-h-screen">
      <Problem />
      <Importance />
      <Solution />
      <Unique />
      <Impact />
    </main>
  );
}
