export const tiers = [
    {
      name: "Ücretsiz",
      slug: "free",
      price: "0 TL",
      priceLifetime: 0,
      polarProductId: null,
      features: [
        "1 Proje",
        "50 Form Doldurma/Proje",
        "listele.io Markası",
        "Sadece Herkese Açık Projeler",
      ],
      lacks: ["Sesle Proje Oluşturma", "Özel Projeler", "Lifetime Erişim"],
    },
    {
      name: "Başlangıç",
      slug: "starter",
      price: "49 TL",
      priceLifetime: 49,
      polarProductId: "starter-lifetime",
      features: [
        "3 Proje",
        "200 Form Doldurma/Proje",
        "Marka olmadan yayınla",
        "5 Sesle Proje Oluşturma",
        "Özel Projeler",
        "Lifetime Erişim",
        "Öncelikli Destek",
      ],
      lacks: [],
    },
    {
      name: "Profesyonel",
      slug: "professional",
      price: "99 TL",
      priceLifetime: 99,
      polarProductId: "professional-lifetime",
      features: [
        "3 Proje",
        "1,000 Form Doldurma/Proje",
        "Marka olmadan yayınla",
        "15 Sesle Proje Oluşturma",
        "Özel Projeler",
        "Lifetime Erişim",
        "Öncelikli Destek",
        "İleri Analitik",
      ],
      lacks: [],
    },
    {
      name: "Kurumsal",
      slug: "enterprise",
      price: "199 TL",
      priceLifetime: 199,
      polarProductId: "enterprise-lifetime",
      features: [
        "3 Proje",
        "Sınırsız Form Doldurma",
        "Marka olmadan yayınla",
        "Sınırsız Sesle Proje Oluşturma",
        "Özel Projeler",
        "Lifetime Erişim",
        "Öncelikli Destek",
        "İleri Analitik",
        "Beyaz Etiket",
        "API Erişimi",
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