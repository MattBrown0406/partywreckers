import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
  size?: "sm" | "default";
}

const SocialShareButtons = ({ 
  title, 
  url,
  className = "",
  size = "default" 
}: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://partywreckers.com");
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        throw new Error("Clipboard not available");
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually from your browser's address bar.",
        variant: "destructive"
      });
    }
  };

  const buttonSize = size === "sm" ? "sm" : "default";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className={`flex flex-wrap items-center gap-2 min-w-0 max-w-full ${className}`}>
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      
      <Button
        variant="outline"
        size={buttonSize}
        asChild
        className="hover:bg-blue-50 hover:border-blue-200"
      >
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Facebook className={`${iconSize} text-blue-600`} />
          {size === "default" && <span className="ml-2">Facebook</span>}
        </a>
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        asChild
        className="hover:bg-gray-50 hover:border-gray-300"
      >
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (formerly Twitter)"
        >
          <Twitter className={`${iconSize} text-gray-900`} />
          {size === "default" && <span className="ml-2">X</span>}
        </a>
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        asChild
        className="hover:bg-blue-50 hover:border-blue-200"
      >
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className={`${iconSize} text-blue-700`} />
          {size === "default" && <span className="ml-2">LinkedIn</span>}
        </a>
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        onClick={copyToClipboard}
        className="hover:bg-green-50 hover:border-green-200"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className={`${iconSize} text-green-600`} />
        ) : (
          <LinkIcon className={`${iconSize} text-gray-600`} />
        )}
        {size === "default" && (
          <span className="ml-2">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        )}
      </Button>
    </div>
  );
};

export default SocialShareButtons;