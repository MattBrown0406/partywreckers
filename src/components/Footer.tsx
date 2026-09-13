import { Instagram, Youtube, Facebook, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const SocialLinks = ({ size = "default" }: { size?: "default" | "small" }) => (
  <div className={`flex items-center ${size === "small" ? "gap-2 sm:gap-3" : "gap-3 sm:gap-4"}`}>
    <a
      href="https://www.tiktok.com/@mattbrowninterventionist"
      target="_blank"
      rel="noopener noreferrer"
      className={`${size === "small" ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors`}
      aria-label="TikTok"
    >
      <TikTokIcon className={size === "small" ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
    </a>
    <a
      href="https://www.instagram.com/mattbrowninterventionist/"
      target="_blank"
      rel="noopener noreferrer"
      className={`${size === "small" ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors`}
      aria-label="Instagram"
    >
      <Instagram className={size === "small" ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
    </a>
    <a
      href="https://www.facebook.com/mbrownsober"
      target="_blank"
      rel="noopener noreferrer"
      className={`${size === "small" ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors`}
      aria-label="Facebook"
    >
      <Facebook className={size === "small" ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
    </a>
    <a
      href="https://www.youtube.com/@ThePartyWreckers"
      target="_blank"
      rel="noopener noreferrer"
      className={`${size === "small" ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors`}
      aria-label="YouTube"
    >
      <Youtube className={size === "small" ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 bg-card border-t border-border" role="contentinfo">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Newsletter Signup */}
          <div className="w-full max-w-md">
            <NewsletterSignup 
              title="Get weekly guidance for families dealing with addiction"
              description="Practical insight, steadier thinking, and honest help for families who are tired of feeling stuck"
              variant="inline"
            />
          </div>

          {/* Logo */}
          <a 
            href="/" 
            className="font-script text-xl sm:text-2xl text-foreground"
            aria-label="The Party Wreckers Podcast - Return to homepage"
          >
            The Party Wreckers
          </a>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">Need a clearer path tonight?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={SITE_PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-burgundy bg-[#982e4a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7e263d]"
              >
                <Phone className="h-4 w-4" />
                Call {SITE_PHONE_DISPLAY}
              </a>
              <Link to="/help-now" className="rounded-full border border-primary/30 px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
                Help Now
              </Link>
              <Link to="/next-step" className="rounded-full border border-primary/30 px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
                Find My Next Step
              </Link>
              <Link to="/from-party-wreckers" className="rounded-full border border-primary/30 px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
                Listener Path
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 list-none p-0 m-0">
              <li>
                <Link to="/help-now" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Now
                </Link>
              </li>
              <li>
                <Link to="/from-party-wreckers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Listener Path
                </Link>
              </li>
              <li>
                <Link to="/start-here" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Start Here
                </Link>
              </li>
              <li>
                <Link to="/family-resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/family-addiction-help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Family Help
                </Link>
              </li>
              <li>
                <Link to="/intervention-readiness" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Intervention Readiness
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link to="/episodes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Episodes
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/host" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Matt Brown
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Advertise
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social links */}
          <SocialLinks />

          {/* Copyright */}
          <p className="text-muted-foreground text-xs sm:text-sm">
            © {new Date().getFullYear()} The Party Wreckers Podcast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
