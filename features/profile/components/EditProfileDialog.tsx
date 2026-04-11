"use client";
import { UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, MapPin, Phone } from "lucide-react";
import { ProfileFormValues } from "../hooks/useProfileAction";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => Promise<void>;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  form,
  onSubmit,
}: EditProfileDialogProps) {
  const { formState: { errors, isSubmitting } } = form;

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        {/* Header with gradient accent */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update your personal information. Changes are saved immediately.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Name Row */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Personal Info
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-first-name" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="edit-first-name"
                  placeholder="John"
                  className="h-10"
                  {...form.register("first_name")}
                />
                {errors.first_name && (
                  <p className="text-xs text-destructive">{errors.first_name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-last-name" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="edit-last-name"
                  placeholder="Doe"
                  className="h-10"
                  {...form.register("last_name")}
                />
                {errors.last_name && (
                  <p className="text-xs text-destructive">{errors.last_name.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <User className="h-3 w-3" /> Account
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="edit-username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="edit-username"
                placeholder="@username"
                className="h-10"
                {...form.register("username")}
              />
              {errors.username && (
                <p className="text-xs text-destructive">{errors.username.message}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> Contact
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="edit-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="edit-phone"
                placeholder="+63 9XX XXX XXXX"
                className="h-10"
                {...form.register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Location
            </p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-address" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  placeholder="Street, Barangay"
                  className="h-10"
                  {...form.register("address")}
                />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-municipal-zone" className="text-sm font-medium">
                    Municipal Zone
                  </Label>
                  <Input
                    id="edit-municipal-zone"
                    placeholder="e.g. Baybay City"
                    className="h-10"
                    {...form.register("municipal_zone")}
                  />
                  {errors.municipal_zone && (
                    <p className="text-xs text-destructive">{errors.municipal_zone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-zone-number" className="text-sm font-medium">
                    Zone Number
                  </Label>
                  <Input
                    id="edit-zone-number"
                    placeholder="e.g. Zone 1"
                    className="h-10"
                    {...form.register("zone_number")}
                  />
                  {errors.zone_number && (
                    <p className="text-xs text-destructive">{errors.zone_number.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
