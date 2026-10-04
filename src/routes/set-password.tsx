import { createFileRoute } from "@tanstack/react-router";
import SetPassword from "@/pages/SetPassword";

export const Route = createFileRoute("/set-password")({
  staticData: { sitemap: false },
  head: () => ({
    title: "Set Admin Password | InfraTech",
    meta: [
      { name: "description", content: "Securely set your InfraTech administrator password." },
      { property: "og:title", content: "Set Admin Password | InfraTech" },
      { property: "og:description", content: "Securely set your InfraTech administrator password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SetPassword,
});