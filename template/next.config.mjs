import { withAnalytics } from "@startupkit/analytics/config";
import { withAuth } from "@startupkit/auth/config";
import { withCMS } from "@startupkit/cms/config";
import { withPayments } from "@startupkit/payments/config";

/** @type {import('next').NextConfig} */
const baseConfig = {
	env: {
		STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
	},
};

/** Combine all the plugins into a single configuration */
const combine = (...plugins) => {
	return plugins.reduce((acc, plugin) => plugin(acc), baseConfig);
};

export default combine(withAnalytics(), withAuth(), withCMS(), withPayments());
