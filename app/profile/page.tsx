import React from "react";
import { User } from "lucide-react";
import PlaceholderSection from "@/components/ui/PlaceholderSection";

export default function ProfilePage() {
  return (
    <PlaceholderSection
      icon={User}
      title="Profile"
      description="The 1Fi SDE assignment focuses specifically on implementing the 1Fi Marketplace within the Shop page experience. Head over to the Shop to explore the marketplace."
    />
  );
}
