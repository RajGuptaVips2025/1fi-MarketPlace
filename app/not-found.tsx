import React from "react";
import { AlertCircle } from "lucide-react";
import PlaceholderSection from "@/components/ui/PlaceholderSection";

export default function NotFound() {
  return (
    <PlaceholderSection
      icon={AlertCircle}
      title="Page Not Found"
      description="The 1Fi SDE assignment focuses specifically on implementing the 1Fi Marketplace within the Shop page experience. Head over to the Shop to explore the marketplace."
    />
  );
}
