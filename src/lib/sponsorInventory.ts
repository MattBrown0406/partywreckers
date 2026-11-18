import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import familybridgeLogo from "@/assets/familybridge-logo.png.asset.json";
import betterhelpLogo from "@/assets/betterhelp-logo.png";
import { funnelLinks } from "@/lib/funnelLinks";

export type Sponsor = {
  id: string;
  name: string;
  label: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  cta: string;
  fit: string[];
  theme: "emerald" | "teal" | "green";
  featured?: boolean;
};

export const sponsors: Sponsor[] = [
  {
    id: "sober-helpline",
    name: "Sober Helpline",
    label: "Free family support",
    description: "Addiction education, practical family resources, and free Monday Family Squares support meetings.",
    url: funnelLinks.familySquares,
    image: soberHelplineLogo,
    imageAlt: "Sober Helpline logo",
    cta: "Join Family Squares",
    fit: ["Family support", "Addiction education", "Weekly Zoom meeting"],
    theme: "emerald",
    featured: true,
  },
  {
    id: "family-bridge",
    name: "FamilyBridge",
    label: "Family recovery technology",
    description: "A connection-focused platform for families working to rebuild trust and communicate more safely.",
    url: "https://familybridgeapp.com",
    image: familybridgeLogo.url,
    imageAlt: "FamilyBridge logo",
    cta: "Visit FamilyBridge",
    fit: ["Recovery communication", "Family connection", "Digital support"],
    theme: "teal",
  },
  {
    id: "betterhelp",
    name: "BetterHelp",
    label: "Online therapy",
    description: "Online access to licensed therapists for people carrying anxiety, stress, grief, relationship strain, or caregiver burnout.",
    url: "https://betterhelp.com/partywreckers",
    image: betterhelpLogo,
    imageAlt: "BetterHelp logo",
    cta: "Get Started",
    fit: ["Therapy", "Caregiver stress", "Mental health support"],
    theme: "green",
  },
];

export const featuredSponsor = sponsors.find((sponsor) => sponsor.featured) || sponsors[0];

export const getSponsorById = (id?: string) =>
  sponsors.find((sponsor) => sponsor.id === id) || featuredSponsor;
