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

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const ApplePodcastsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c4.988 0 9.037 4.062 9.037 9.066 0 4.988-4.049 9.037-9.037 9.037-4.988 0-9.037-4.049-9.037-9.037 0-5.004 4.049-9.066 9.037-9.066zm0 3.047c-3.279 0-5.943 2.651-5.943 5.943a5.95 5.95 0 002.357 4.734l-.744 2.303c-.09.276.167.543.447.469l2.381-.629a5.923 5.923 0 003.502.029l2.381.629c.28.074.537-.193.447-.469l-.744-2.303a5.95 5.95 0 002.357-4.734c0-3.292-2.664-5.943-5.943-5.943zm0 2.187a1.16 1.16 0 110 2.32 1.16 1.16 0 010-2.32zm0 3.035c1.106 0 2.005.892 2.005 1.988 0 .907-.619 1.668-1.455 1.9v1.945a.56.56 0 01-.55.56.56.56 0 01-.55-.56v-1.945c-.836-.232-1.455-.993-1.455-1.9 0-1.096.899-1.988 2.005-1.988z"/>
  </svg>
);

const AmazonMusicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M1.623 19.135c3.156 2.207 7.19 3.442 11.298 3.442 4.108 0 8.142-1.235 11.298-3.442.293-.195.39-.585.195-.878-.195-.293-.585-.39-.878-.195-2.937 2.012-6.63 3.075-10.615 3.075s-7.678-1.063-10.615-3.075c-.293-.195-.683-.098-.878.195-.195.293-.098.683.195.878zM21.83 17.025c-.39-.488-2.548-.244-3.514-.122-.293.037-.341-.22-.073-.403 1.72-1.21 4.537-.86 4.866-.455.329.407-.085 3.224-1.7 4.566-.247.207-.485.097-.373-.17.366-.903 1.183-2.928.794-3.416zM18.317 6.884V6.2c0-.207.158-.341.341-.341h6.018c.195 0 .354.146.354.341v.585c-.012.195-.17.45-.476.878l-3.12 4.456c1.16-.024 2.39.146 3.442.744.236.134.3.329.317.524v.744c0 .207-.22.439-.463.317-1.928-1.014-4.488-1.123-6.623.012-.22.122-.451-.11-.451-.329v-.707c0-.22.012-.598.232-.927l3.612-5.176h-3.145c-.195 0-.354-.134-.341-.341l.303.004zM6.623 12.841h-1.83c-.17-.012-.305-.134-.317-.293V6.212c0-.17.146-.305.329-.305h1.708c.17.012.305.146.317.305v.841h.037c.415-1.17 1.196-1.72 2.256-1.72 1.074 0 1.745.549 2.226 1.72.415-1.17 1.355-1.72 2.378-1.72.72 0 1.507.293 1.989.963.549.744.439 1.83.439 2.78v4.476c0 .17-.146.305-.329.305h-1.818c-.17-.012-.305-.146-.305-.305V9.31c0-.366.037-1.293-.049-1.635-.122-.573-.5-.732-.976-.732-.403 0-.82.268-.988.695-.17.427-.158 1.147-.158 1.672v3.245c0 .17-.146.305-.329.305h-1.818c-.17-.012-.305-.146-.305-.305l-.012-3.245c0-.976.158-2.402-1.025-2.402-1.196 0-1.147 1.39-1.147 2.402v3.245c-.012.158-.158.293-.341.293l.085-.003zM3.734 5.333c1.086 0 1.977.878 1.977 1.964 0 1.086-.878 1.977-1.977 1.977-1.098 0-1.977-.878-1.977-1.977s.878-1.964 1.977-1.964zm-1.854 3.514v3.733c0 .17-.146.305-.329.305H.732c-.17-.012-.305-.146-.305-.305V6.212c0-.17.146-.305.329-.305h.841c.17.012.305.134.305.305v1.635z"/>
  </svg>
);

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

const podcastLinks = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-party-wreckers/id1611904917", icon: ApplePodcastsIcon, color: "text-[#9933CC]" },
  { label: "Spotify", href: "https://open.spotify.com/show/4YJLvnFuZr5EkcGs9b47fn?si=bde59f5f480c45a2", icon: SpotifyIcon, color: "text-[#1DB954]" },
  { label: "Amazon Music", href: "https://music.amazon.com/podcasts/b7bf2801-8447-4dfc-9857-aa41cd4cfc64/the-party-wreckers", icon: AmazonMusicIcon, color: "text-[#00A8E1]" },
  { label: "PodBay", href: "https://podbay.fm/p/the-party-wreckers-podcast", icon: PodBayIcon, color: "text-[#4CAF50]" },
  { label: "PodChaser", href: "https://www.podchaser.com/podcasts/the-party-wreckers-4256744", icon: PodChaserIcon, color: "text-[#FF6B35]" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="hidden md:flex items-center gap-4 text-sm">
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
          <div className="flex items-center gap-2 md:hidden">
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
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
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
