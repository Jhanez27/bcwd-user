import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  LogIn,
} from "lucide-react";
import { Logo } from "@/components/logo";

export function Contact() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Blue wave background */}
      <div
        className="flex flex-col flex-1 z-0"
        style={{
          backgroundImage: "url('/wave-blue-bg-non-compressed.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header */}
        <header className="border-b border-primary/20 bg-[#0D163A] backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <Link href="/login">
              <Button className="gap-2 bg-white text-primary hover:bg-white/90">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 flex-1">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left side - Contact info */}
            <div className="text-white space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4 text-white/80">
                  <CircleCheck className="h-5 w-5" />
                  <span className="text-sm">
                    Your reliable way to stay on top of your water bills.
                  </span>
                </div>
                <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg text-white/90">
                  Have questions or need assistance? We&apos;re here to help.
                  Reach out to us anytime we will get back to you as soon as
                  possible.
                </p>
              </div>

              {/* Address */}
              <div className="bg-white/7 rounded-lg p-6 border border-white/20 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Address</h3>
                    <p className="text-white/80 text-sm">
                      119 Emilio Jacinto Street, Zone-19, Baybay City, Leyte,
                      6521 Philippines
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden border border-white/20 h-96">
                    <iframe
                      src="https://www.google.com/maps?q=10.6688629,124.8045596&z=18&output=embed"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Socials */}
            {/* Contacts Card */}
            <div className="flex flex-col gap-8">
              <div className="bg-white/7 backdrop-blur border  border-white/20 rounded-lg p-6 text-white space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 font-bold mb-4">
                    <Phone className="h-5 w-5" />
                    Contacts
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/80 text-sm">E Hotline No.:</p>
                      <p className="font-semibold">0917 535 8130</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Tel No.:</p>
                      <p className="font-semibold">
                        (053) 560-1867, (053) 563-9478
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email account */}
              <div className="bg-white/7 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
                <h3 className="flex items-center gap-2 font-bold mb-4">
                  <Mail className="h-5 w-5" />
                  Email Accounts
                </h3>
                <p className="font-semibold">
                  baybay.citywaterdistrict@yahoo.com
                </p>
              </div>

              {/* Schedule  */}
              <div className="bg-white/7 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
                <h3 className="flex items-center gap-2 font-bold mb-4">
                  <Clock className="h-5 w-5" />
                  Schedule
                </h3>
                <p className="font-semibold">
                  Open Monday – Friday, 8:00am – 5:00pm
                </p>
              </div>

              {/* Social Section */}
              <div className="bg-white/7 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-6">Socials</h3>
                <div className="flex gap-4">
                  <button className="bg-white text-primary p-3 rounded-full hover:bg-white/90 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </button>
                  <button className="bg-white text-primary p-3 rounded-full hover:bg-white/90 transition-colors">
                    <Mail className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/20 bg-[#0D163A] mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">
                © 2026 Baybay City Water District. All Rights Reserved.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/BCWDistrict"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
