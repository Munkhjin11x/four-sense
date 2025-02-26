import Image from "next/image";
import { Input } from "../ui/input";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../ui";
import { CDN_URL } from "@/constants/contant";
import { useState } from "react";

const links = [
  { icon: "/social/facebook.svg", href: "/" },
  { icon: "/social/instagram.svg", href: "/" },
  { icon: "/social/youtube.svg", href: "/" },
  { icon: "/social/spotify.svg", href: "/" },
];

export const FooterSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const mailtoLink = `mailto:info@foursenses.mn?subject=${encodeURIComponent(
      `New Contact Form Submission from ${formData.fullName}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div
      className="h-full flex w-full flex-col items-center bg-cover p-4 sm:p-10 justify-center"
      style={{ backgroundImage: "url(/images/footer.webp)" }}
    >
      <div className="flex flex-col gap-10 sm:gap-20 justify-start w-full max-w-[1740px] px-4 sm:px-10 mt-10 sm:mt-20">
        <Image
          src={`${CDN_URL}/images/footer-title.webp`}
          alt="Footer Title"
          width={782}
          height={500}
        />
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2">
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="FULL NAME"
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="EMAIL ADDRESS"
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="PHONE NUMBER"
            />
            <Input
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="Message"
            />
          </div>
          <Button
            variant="ghost"
            className="w-fit text-[#488457] font-semibold text-2xl"
            onClick={handleSubmit}
          >
            Send <ArrowRight />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-0">
          <div className="text-[#E78140] text-base sm:text-xl flex flex-col gap-2">
            <p>Make a reservation: (+976) 9660-9993</p>
            <p>info@foursenses.mn</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#E78140] text-base sm:text-xl">
              ALTAN JOLOO TOWER B1,
              <br /> Ulaanbaatar, Mongolia
            </p>
            <Link
              className="text-[#E78140] text-base sm:text-xl flex items-center gap-2"
              href="https://maps.app.goo.gl/mo7UawLVTtprHxiR8"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on map <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-0">
          <div>
            <p className="text-[#E78140] text-base sm:text-xl">
              Monday to Wednesday: 7:30 PM – 2:00 AM
            </p>
            <p className="text-[#E78140] text-base sm:text-xl">
              Thursday to Sunday: 8:00 PM – 4:00 AM
            </p>
          </div>
          <div className="flex gap-4 justify-center sm:justify-start">
            {links.map((e, i) => (
              <Link
                className="border-2 border-[#E78140] flex items-center justify-center h-fit p-2 rounded-tl-2xl"
                key={i}
                href={e.href}
              >
                <Image
                  src={e.icon}
                  alt={`Social ${i}`}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
