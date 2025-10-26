import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ComparisonView } from "@/components/comparison-view";

export default function Comparison() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 lg:px-16">
        <ComparisonView />
      </main>
      <Footer />
    </div>
  );
}
