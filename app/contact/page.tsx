import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Facebook, Mail as MailIcon } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80">
      {/* Header */}
      <header className="border-b border-primary/20 bg-primary/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary font-bold text-xs">
              BCWD
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white">BCWD</span>
              <span className="text-xs text-white/80">Billing System</span>
            </div>
          </div>
          <Link href="/login">
            <Button className="bg-white text-primary hover:bg-white/90">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <div className="text-white space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4 text-white/80">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">Your reliable way to stay on top of your water bills.</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-white/90">
                Have questions or need assistance? We&apos;re here to help. Reach out to us anytime we will get back to you as soon as possible.
              </p>
            </div>

            {/* Address */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Address</h3>
                  <p className="text-white/80 text-sm">
                    119 Emilio Jacinto Street, Zone-19, Baybay City, Leyte, 6521 Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact details and map placeholder */}
          <div className="space-y-6">
            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-white/20 h-96">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.8365478256584!2d124.30851722346035!3d10.402639389673293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a97d5d5d5d5d5d%3A0x0!2sEmilio%20Jacinto%20St%2C%20Baybay%2C%20Leyte!5e0!3m2!1sen!2sph!4v"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Contacts Card */}
          <div className="bg-primary/40 backdrop-blur border border-white/20 rounded-lg p-6 text-white space-y-6">
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
                  <p className="font-semibold">(053) 560-1867, (053) 563-9478</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold mb-4">
                <Mail className="h-5 w-5" />
                Email Accounts
              </h3>
              <p className="font-semibold">baybay.citywaterdistrict@yahoo.com</p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold mb-4">
                <Clock className="h-5 w-5" />
                Schedule
              </h3>
              <p className="font-semibold">Open Monday – Friday, 8:00am – 5:00pm</p>
            </div>
          </div>

          {/* Social Section */}
          <div className="bg-primary/40 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <button className="bg-white text-primary p-3 rounded-full hover:bg-white/90 transition-colors">
                <Facebook className="h-6 w-6" />
              </button>
              <button className="bg-white text-primary p-3 rounded-full hover:bg-white/90 transition-colors">
                <MailIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-primary/80 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/80">
              © 2026 Baybay City Water District. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Alert icon fallback
function AlertCircle({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
