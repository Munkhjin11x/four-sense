"use client";
import { Button } from "../ui";
import { useCallback, useState } from "react";
import { LinkLogo } from "@/icons/link-logo";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { XLogo } from "@/icons/x-logo";
import { FbLogo } from "@/icons/fb-logo";
import { LinkedInLogo } from "@/icons/linkedin-logo";

export const ShareButtons = () => {
  const { push } = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyPath = () => {
    const currentPath = window.location.pathname;

    navigator.clipboard
      .writeText(currentPath)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const handleShareButtonClick = useCallback(
    (href: string, type: string, quote?: string, hashtag?: string) => {
      let shareUrl = `${href}${encodeURIComponent(window.location.href)}`;
      if (type === "Facebook") {
        shareUrl += `&quote=${encodeURIComponent(quote || "")}&hashtag=${encodeURIComponent(hashtag || "")}`;
      } else if (type === "Linked in") {
        shareUrl += `&title=${encodeURIComponent(quote || "")}`;
      } else if (type === "X platform") {
        shareUrl += `&text=${encodeURIComponent(quote || "")}&media=${encodeURIComponent(hashtag || "")}`;
      }
      push(shareUrl);
    },
    [push]
  );
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="flex items-center gap-3">
        <Button
          className=" gap-2 p-1 bg-white px-2"
          variant={"outline"}
          aria-label={"share"}
        >
          Share
        </Button>
        {blogLogo.map((element, indx) => (
          <Button
            key={indx}
            className="gap-2 p-1 bg-white px-2"
            variant={"outline"}
            aria-label={element.desc}
            onClick={() => handleShareButtonClick(element.href, element.desc)}
          >
            {element.icon}
          </Button>
        ))}
        <Button
          className="gap-2 p-1 bg-white px-2"
          variant={"outline"}
          aria-label={"copy"}
          onClick={handleCopyPath}
          disabled={copied}
        >
          {!copied && <LinkLogo />}
          {copied && <Check size={20} />}
        </Button>
      </div>
    </div>
  );
};
export const blogLogo = [
  {
    icon: <XLogo />,
    href: "https://twitter.com/intent/tweet?url=",
    desc: "X platform",
  },
  {
    icon: <FbLogo />,
    href: "https://www.facebook.com/sharer/sharer.php?u=",
    desc: "Facebook",
  },
  {
    icon: <LinkedInLogo />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url=",
    desc: "Linked in",
  },
];
