import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScenarioResult } from "@/components/scenario-result";

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 lg:px-16">
        <ScenarioResult />
      </main>
      <Footer />
    </div>
  );
}
