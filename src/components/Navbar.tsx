import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/party-wreckers-logo-512.webp";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";
import PodcastPlatformIcon from "@/components/PodcastPlatformIcon";
import { PLATFORM_ICON_COLOR, trackPlatformClick, usePlatformOrder } from "@/lib/podcastPlatforms";

const PodBayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const PodChaserIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

interface NavLink {
  label: string;
  href: string;
  featured?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Help Now", href: "/help-now", featured: true },
  { label: "For Listeners", href: "/from-party-wreckers" },
  { label: "Start Here", href: "/start-here" },
  { label: "Episodes", href: "/episodes" },
  { label: "Family Resources", href: "/family-resources" },
  { label: "Support Our Sponsors", href: "/sponsors" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
];

const mattLinks = [
  { label: "Ask Matt a Question", href: "/ask-matt" },
  { label: "Meet the Host", href: "/host" },
  { label: "Press & Media Kit", href: "/press" },
];

const guideLinks = [
  { label: "Family Addiction Help", href: "/family-addiction-help" },
  { label: "Intervention Readiness", href: "/intervention-readiness" },
  { label: "Enabling vs Support", href: "/enabling-vs-support" },
  { label: "Recovery Resources", href: "/recovery-resources" },
  { label: "Glossary", href: "/glossary" },
  { label: "Sponsor Information", href: "/sponsor-info" },
  { label: "Sponsor Kit", href: "/sponsor-kit" },
];

// Directory listings that come after the main apps.
const extraPodcastLinks = [
  { id: "podbay", label: "PodBay", href: "https://podbay.fm/p/the-party-wreckers-podcast", icon: PodBayIcon, color: "text-[#4CAF50]" },
  { id: "podchaser", label: "PodChaser", href: "https://www.podchaser.com/podcasts/the-party-wreckers-4256744", icon: PodChaserIcon, color: "text-[#FF6B35]" },
];

/** Podcast apps for the Follow menu, with the visitor's likely app first (after mount). */
const usePodcastMenuLinks = () => {
  const { ordered } = usePlatformOrder();
  return [
    ...ordered.map((platform) => ({
      id: platform.id,
      label: platform.name,
      href: platform.url,
      icon: () => <PodcastPlatformIcon platform={platform.id} />,
      color: PLATFORM_ICON_COLOR[platform.id],
    })),
    ...extraPodcastLinks,
  ];
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const podcastLinks = usePodcastMenuLinks();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="container px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} width={512} height={512}
              alt="The Party Wreckers Podcast" 
              className="h-12 sm:h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            {navLinks.map((link) => (
              link.href.startsWith("/") && !link.href.includes("#") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`transition-colors font-medium ${
                    link.featured 
                      ? "text-burgundy hover:text-burgundy/80 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition-colors font-medium ${
                    link.featured 
                      ? "text-burgundy hover:text-burgundy/80 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
                  Guides <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                {guideLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link to={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Matt Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
                  Matt <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                {mattLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link
                      to={link.href}
                      className="cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Call button */}
            <a
              href={SITE_PHONE_HREF}
              className="inline-flex items-center gap-1.5 rounded-full border border-burgundy/40 bg-burgundy/10 px-3 py-1.5 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
              aria-label={`Call ${SITE_PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">{SITE_PHONE_DISPLAY}</span>
              <span className="lg:hidden">Call</span>
            </a>

            {/* Subscribe Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm">
                  Subscribe <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                {podcastLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackPlatformClick(link.id, "navbar", link.href)}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <span className={link.color}><link.icon /></span>
                      {link.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile: call + menu buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE_PHONE_HREF}
              className="inline-flex items-center gap-1.5 rounded-full border border-burgundy/40 bg-burgundy/10 px-3 py-1.5 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
              aria-label={`Call ${SITE_PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div id="mobile-navigation" className="lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith("/") && !link.href.includes("#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`transition-colors font-medium py-2 ${
                      link.featured 
                        ? "text-burgundy hover:text-burgundy/80 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`transition-colors font-medium py-2 ${
                      link.featured 
                        ? "text-burgundy hover:text-burgundy/80 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              
              {/* Matt links in mobile */}
              <div className="border-t border-border pt-4 mt-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Guides</p>
                {guideLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Matt links in mobile */}
              <div className="border-t border-border pt-4 mt-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">About Matt</p>
                {mattLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <a
                href={SITE_PHONE_HREF}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-burgundy/40 bg-burgundy/10 px-4 py-2 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Call {SITE_PHONE_DISPLAY}
              </a>

              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm" className="w-full mt-4">
                    Subscribe <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full bg-background border-border">
                  {podcastLinks.map((link) => (
                    <DropdownMenuItem key={link.label} asChild>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackPlatformClick(link.id, "navbar_mobile", link.href)}
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <span className={link.color}><link.icon /></span>
                        {link.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
