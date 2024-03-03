"use client";

import Button from "@/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Card from "@/ui/Card";
import { Price, Product, Subscription } from "@prisma/client";

type SubscriptionWithPriceAndProduct = Subscription & {
  price:
    | (Price & {
        product: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.price?.currency!,
      minimumFractionDigits: 0,
    }).format((subscription?.price?.unitAmount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);

    const { redirectUrl } = await fetch("/api/stripe/portal", {
      method: "POST",
      body: JSON.stringify({ redirectTo: currentPath }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card
      title="Your Plan"
      description={
        subscription
          ? `You are currently on the ${subscription?.price?.product?.name} plan.`
          : "You are not currently subscribed to any plan."
      }
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
          <Button
            variant="slim"
            onClick={handleStripePortalRequest}
            loading={isSubmitting}
          >
            Open customer portal
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        {subscription ? (
          `${subscriptionPrice}/${subscription?.price?.interval}`
        ) : (
          <Link href="/">Choose your plan</Link>
        )}
      </div>
    </Card>
  );
}
