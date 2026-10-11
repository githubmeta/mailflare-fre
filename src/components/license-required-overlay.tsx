import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import type { LicenseRequiredOverlayProps } from "./license-required-overlay-types";

export function LicenseRequiredOverlay({ children }: LicenseRequiredOverlayProps) {
	return <>{children}</>;
}
