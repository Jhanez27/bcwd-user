"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, User, Pencil } from "lucide-react";
import { useProfileActions } from "../hooks/useProfileAction";
import { EditProfileDialog } from "./EditProfileDialog";

export function Profile() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { form, onSubmit, loading } = useProfileActions();

  const firstName = form.watch("first_name");
  const lastName = form.watch("last_name");
  const username = form.watch("username");
  const address = form.watch("address");
  const phone = form.watch("phone");
  const municipalZone = form.watch("municipal_zone");
  const zoneNumber = form.watch("zone_number");

  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : "??";

  return (
    <div className="space-y-6">
      {/* Edit Dialog */}
      <EditProfileDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        form={form}
        onSubmit={onSubmit}
      />

      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 text-2xl font-bold ring-4 ring-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {loading ? "..." : initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            {loading ? (
              <>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-foreground">
                  {firstName} {lastName}
                </h1>
                <p className="text-muted-foreground">@{username}</p>
              </>
            )}
          </div>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Account Info */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Username</p>
              {loading ? (
                <Skeleton className="h-5 w-36" />
              ) : (
                <p className="text-sm font-semibold text-foreground">@{username || "—"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Phone Number</p>
              {loading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <p className="text-sm font-semibold text-foreground">{phone || "—"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border-border md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Address</p>
                {loading ? (
                  <Skeleton className="h-5 w-40" />
                ) : (
                  <p className="text-sm font-semibold text-foreground">{address || "—"}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Municipal Zone</p>
                {loading ? (
                  <Skeleton className="h-5 w-28" />
                ) : (
                  <p className="text-sm font-semibold text-foreground">{municipalZone || "—"}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Zone Number</p>
                {loading ? (
                  <Skeleton className="h-5 w-20" />
                ) : (
                  <p className="text-sm font-semibold text-foreground">{zoneNumber || "—"}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
