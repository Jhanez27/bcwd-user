import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left side - Water imagery */}
      <div className="bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <circle cx="20" cy="30" r="15" fill="currentColor" filter="url(#blur)" className="text-accent opacity-40" />
            <circle cx="70" cy="50" r="20" fill="currentColor" filter="url(#blur)" className="text-secondary opacity-30" />
            <circle cx="40" cy="70" r="25" fill="currentColor" filter="url(#blur)" className="text-primary opacity-50" />
          </svg>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Water</h1>
          <p className="text-xl opacity-80">Your essential resource</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="bg-background p-8 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              <span className="text-xs">BCWD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none">BCWD</span>
              <span className="text-xs text-muted-foreground">Billing System</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Login Account</h1>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Username</label>
              <Input
                type="text"
                placeholder="Enter your Username"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Enter your Password"
                className="h-10"
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10">
              Login as Costumer
            </Button>
          </form>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">No Account? </span>
            <Link href="/signup" className="text-sm text-primary hover:underline font-medium">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
