import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function Profile() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rigen Suringa</h1>
            <p className="text-muted-foreground">@RigenSuringaXJulian</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Edit Profile
        </Button>
      </div>

      {/* User Details */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl">User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Username</p>
              <p className="text-foreground font-semibold">RigenSuringaXJulian</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Location</p>
              <p className="text-foreground font-semibold">Baybay</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Profile Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Email</p>
              <p className="text-sm text-foreground">user@baybay.gov.ph</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Phone Number</p>
              <p className="text-sm text-foreground">+63 917 535 8130</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Member Since</p>
              <p className="text-sm text-foreground">January 2, 2024</p>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Email Notifications</span>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">SMS Notifications</span>
              <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Payment Reminders</span>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
