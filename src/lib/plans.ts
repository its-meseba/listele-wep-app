export const tiers = [
    {
      name: "Free",
      slug: "free",
      price: "$0",
      priceLifetime: 0,
      polarProductId: null,
      features: [
        "1 page",
        "200 leads",
        "First100 subdomain",
        "Basic analytics",
      ],
      lacks: ["Custom domain", "Media support", "Voice-to-project", "Advanced analytics"],
    },
    {
      name: "Starter",
      slug: "starter",
      price: "$29",
      priceLifetime: 29,
      polarProductId: "starter-lifetime",
      features: [
        "Custom domain",
        "Unlimited leads",
        "Basic analytics",
        "All Free features",
      ],
      lacks: ["Images & video", "Advanced analytics", "A/B sections"],
    },
    {
      name: "Pro",
      slug: "professional",
      price: "$99",
      priceLifetime: 99,
      polarProductId: "professional-lifetime",
      features: [
        "Images & video",
        "Advanced analytics",
        "A/B sections",
        "Voice-to-project",
        "All Starter features",
      ],
      lacks: [],
    },
    {
      name: "Studio",
      slug: "enterprise",
      price: "$199",
      priceLifetime: 199,
      polarProductId: "enterprise-lifetime",
      features: [
        "Collaboration",
        "API access",
        "Priority support",
        "White-label",
        "All Pro features",
      ],
      lacks: [],
    }
  ];
  
  export const freePlan = tiers[0];
  export const starterPlan = tiers[1];
  export const professionalPlan = tiers[2];
  export const enterprisePlan = tiers[3];
  
  export const getPlanBySlug = (slug: string) => {
    return tiers.find(tier => tier.slug === slug);
  } 