import { getServerTranslator } from "@/lib/i18n/server";
import { CheckCircle2, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LicensesPage() {
  const t = await getServerTranslator();
  const unlockedFeatures = [
    "Multi-user team management with unlimited seats",
    "Shared inboxes and collaborative mailbox access",
    "Custom application branding and app icon customization",
    "Automated email forwarding",
    "All advanced routing and agentic workflows",
    "Unlimited domain and alias configurations",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-neutral-900">{t("licenses.title")}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          All Pro and Team features are permanently unlocked and enabled for this installation.
        </p>
      </div>

      <Card className="rounded-3xl border-0 bg-white p-6">
        <CardHeader className="flex-row items-center gap-4 space-y-0 py-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Team Edition Active</CardTitle>
            <CardDescription className="mt-1">
              Full access granted without any seat limits or restrictions.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral-900">Included Features:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {unlockedFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                  <Check className="h-4 w-4 shrink-0 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
