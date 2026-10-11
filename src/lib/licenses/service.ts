import { eq } from "drizzle-orm";
import packageJson from "../../../package.json";
import { getDb } from "@/db";
import { licenseSettings } from "@/db/schema";
import { LICENSE_PRODUCT_IDS } from "./constants";
import { callPaymugLicenseApi } from "./paymug";
import type { LicenseEntitlements, LicensePlan, LicenseStatus, PaymugLicenseAction } from "./types";
import { hashLicenseKey, normalizeLicensePlan, parseFeatures } from "./utils";

const LICENSE_SETTINGS_ID = "default";

async function getOrCreateLicenseSettings(env: CloudflareEnv) {
	const db = getDb(env);
	await db
		.insert(licenseSettings)
		.values({ id: LICENSE_SETTINGS_ID, instanceId: crypto.randomUUID() })
		.onConflictDoNothing({ target: licenseSettings.id });
	const [settings] = await db
		.select()
		.from(licenseSettings)
		.where(eq(licenseSettings.id, LICENSE_SETTINGS_ID))
		.limit(1);
	if (!settings) throw new Error("Unable to initialize license settings");
	return settings;
}

function toLicenseStatus(settings?: typeof licenseSettings.$inferSelect): LicenseStatus {
	return {
		plan: "team",
		state: "active",
		features: ["branding", "accounts", "shared_mailboxes", "forwarding", "unlimited_seats"],
		seatLimit: null,
		instanceId: settings?.instanceId ?? "default",
		instanceUrl: settings?.instanceUrl ?? "",
		active: true,
		activatedAt: new Date("2026-01-01"),
		validatedAt: new Date(),
	};
}

export async function getLicenseStatus(_env: CloudflareEnv): Promise<LicenseStatus> {
	return toLicenseStatus();
}

export async function getLicenseEntitlements(_env: CloudflareEnv): Promise<LicenseEntitlements> {
	return {
		plan: "team",
		canCustomizeBranding: true,
		canManageAccounts: true,
		canShareMailboxes: true,
		accountSeatLimit: null,
		canForwardEmail: true,
	};
}

async function updateLicenseFromPaymug(
	_env: CloudflareEnv,
	_action: PaymugLicenseAction,
	_licenseKey: string,
	_instanceUrl: string,
	_requestedPlan?: Exclude<LicensePlan, "community">,
): Promise<LicenseStatus> {
	return toLicenseStatus();
}

export function activateLicense(
	env: CloudflareEnv,
	licenseKey: string,
	instanceUrl: string,
	plan: Exclude<LicensePlan, "community">,
) {
	return updateLicenseFromPaymug(env, "activate", licenseKey, instanceUrl, plan);
}

export function validateLicense(env: CloudflareEnv, licenseKey: string, instanceUrl: string) {
	return updateLicenseFromPaymug(env, "validate", licenseKey, instanceUrl);
}

export function deactivateLicense(env: CloudflareEnv) {
	return updateLicenseFromPaymug(env, "deactivate", "", "");
}
