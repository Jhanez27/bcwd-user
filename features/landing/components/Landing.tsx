import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Phone, FileText, AlertCircle } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
              BCWD
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">BCWD</span>
              <span className="text-xs text-muted-foreground">Billing System</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button variant="ghost">Contact Us</Button>
            </Link>
            <Link href="/login">
              <Button className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white mb-20">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3 text-white/80">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Your reliable way to stay on top of your water bills.</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to the Baybay City Water District Billing System
            </h1>
            <p className="text-lg text-white/90">
              The platform where customers stay informed of their water bills, streamlined communication, reduces missed payment, and averts inaccurate, timely, and readily available.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
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
            <h2 className="text-4xl font-bold mb-2">About Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how we serve the Baybay City Water District with excellence
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">
              Secure and convenient access to the city&apos;s official water billing services.
            </h3>
            <p className="text-foreground leading-relaxed mb-4">
              The Baybay City Water District Billing System is a secure and convenient platform designed to connect customers directly with the city&apos;s water billing services.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              This system serves as a bridge between the city and its residents by providing easy access to important billing information in one centralized location. Customers can conveniently view their water bills, pay bills online, monitor their account, and stay updated with billing information without needing to visit city offices or wait for paper statements.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              By using this platform, customers can stay informed about their water consumption, reduce missed payments, and promote a more efficient and reliable billing experience. The system ensures that all billing information is accurate, timely, and readily available.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              Our mission is to make city water billing more accessible, efficient, and reliable for everyone. Through this platform, the city can better serve its customers while customers enjoy a simpler and more connected billing experience.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-bold mb-2">Mission</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-bold mb-2">Vision</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="font-bold">Accurate Billing</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Get detailed and accurate billing information updated regularly to keep you informed about your water usage.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <h3 className="font-bold">Easy Support</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Reach out to our customer support team anytime with questions about your account or billing.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-primary" />
              <h3 className="font-bold">Reliable Service</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Count on a secure and reliable platform that keeps your billing information safe and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 Baybay City Water District. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
