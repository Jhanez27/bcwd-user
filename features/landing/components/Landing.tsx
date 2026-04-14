import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Phone, FileText, AlertCircle, Facebook } from "lucide-react";
import { Logo } from "@/components/logo";

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#071227]">
      {/* Header */}
      <header className="border-b border-primary/20 bg-[#0D163A] backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center ">
            <Logo />
          </div>

          <Link href="/login">
            <Button className="gap-2 bg-white text-primary hover:bg-white/90">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
        </div>
      </header>
      {/* Blue wave background   bg-gradient-to-b from-primary/10 to-background*/}
      <div className="relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/wave-blue-bg-non-compressed.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#071227] to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center ">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="bg-white/7 border border-white/20 rounded-2xl p-12 text-white mb-20">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center gap-3 text-white/80">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">
                    Your reliable way to stay on top of your water bills.
                  </span>
                </div>
                <h1 className="text-5xl font-bold leading-tight">
                  Welcome to the Baybay City Water District Billing System
                </h1>
                <p className="text-lg text-white/90">
                  The platform where customers stay informed of their water
                  bills, streamlined communication, reduces missed payment, and
                  averts inaccurate, timely, and readily available.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          {/* About Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2 text-white">About Us</h2>
                <p className=" max-w-2xl mx-auto text-white/50">
                  Discover how we serve the Baybay City Water District with
                  excellence
                </p>
              </div>
              <div className=" rounded-lg p-8  bg-white/7 border border-white/20">
                <h3 className="text-2xl font-bold mb-10 text-white">
                  Secure and convenient access to the city&apos;s official water
                  billing services.
                </h3>
                <p className="text-white leading-relaxed mb-4 ">
                  The Baybay City Water District Billing System is a secure and
                  convenient platform designed to connect customers directly
                  with the city&apos;s water billing services.
                </p>
                <p className="text-white leading-relaxed mb-4">
                  This system serves as a bridge between the city and its
                  residents by providing easy access to important billing
                  information in one centralized location. Customers can
                  conveniently view their water bills, pay bills online, monitor
                  their account, and stay updated with billing information
                  without needing to visit city offices or wait for paper
                  statements.
                </p>
                <p className="text-white leading-relaxed mb-4">
                  By using this platform, customers can stay informed about
                  their water consumption, reduce missed payments, and promote a
                  more efficient and reliable billing experience. The system
                  ensures that all billing information is accurate, timely, and
                  readily available.
                </p>
                <p className="text-white leading-relaxed">
                  Our mission is to make city water billing more accessible,
                  efficient, and reliable for everyone. Through this platform,
                  the city can better serve its customers while customers enjoy
                  a simpler and more connected billing experience.
                </p>
              </div>
            </div>
          </section>
          {/* Core Values Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Core Values</h2>
              <div className="grid md:grid-cols-2 gap-8 text-white">
                <div className=" rounded-lg p-6  bg-white/7 border border-white/20">
                  <h3 className="text-xl font-bold mb-6">Mission</h3>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className=" rounded-lg p-6  bg-white/7 border border-white/20">
                  <h3 className="text-xl font-bold mb-6 text-white">Vision</h3>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Info Cards */}
          <section className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-3 gap-6">
              <div className=" rounded-lg p-6  bg-white/7 border border-white/20 space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-white" />
                  <h3 className="font-bold text-white">Accurate Billing</h3>
                </div>
                <p className="text-sm text-white">
                  Get detailed and accurate billing information updated
                  regularly to keep you informed about your water usage.
                </p>
              </div>
              <div className=" rounded-lg p-6  bg-white/7 border border-white/20 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-white" />
                  <h3 className="font-bold text-white">Easy Support</h3>
                </div>
                <p className="text-sm text-white">
                  Reach out to our customer support team anytime with questions
                  about your account or billing.
                </p>
              </div>
              <div className=" rounded-lg p-6  bg-white/7 border border-white/20 space-y-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-white" />
                  <h3 className="font-bold text-white">Reliable Service</h3>
                </div>
                <p className="text-sm text-white  ">
                  Count on a secure and reliable platform that keeps your
                  billing information safe and accessible.
                </p>
              </div>
            </div>
          </section>
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
  );
}
