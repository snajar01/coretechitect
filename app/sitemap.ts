import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://coretechitect.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["privacy", "terms", "sms"].map((path) => ({
      url: `https://coretechitect.com/${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
