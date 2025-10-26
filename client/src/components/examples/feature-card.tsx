import { FeatureCard } from "../feature-card";
import { Brain } from "lucide-react";

export default function FeatureCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <FeatureCard
        icon={Brain}
        title="AI Scenario Generator"
        description="Generate realistic career scenarios based on your education, skills, and personality type with advanced AI."
      />
    </div>
  );
}
