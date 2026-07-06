"use client";

import { useState } from "react";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john@example.com",
    avatar: "/avatars/avatar-1.svg",
    bio: "Product Manager focused on SaaS growth loops, onboarding, and retention playbooks.",
    role: "admin",
    location: "New York, USA",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-border/70">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{profile.name}</h1>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Role</p>
            <p className="mt-1 font-medium capitalize">{profile.role}</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Timezone</p>
            <p className="mt-1 font-medium">{profile.timezone.replace("_", " ")}</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
            <Badge className="mt-1 rounded-md bg-emerald-500/10 text-emerald-500">Verified</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={profile.location} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              {isEditing ? (
                <Select value={profile.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input id="role" value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} disabled />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              {isEditing ? (
                <Select value={profile.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input id="timezone" value={profile.timezone.replace("_", " ")} disabled />
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="min-h-28 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Security
              </p>
              <p className="mt-1 text-muted-foreground">2FA enabled and recovery methods configured.</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="flex items-center gap-2 font-medium">
                <MapPin className="h-4 w-4 text-sky-500" />
                Location
              </p>
              <p className="mt-1 text-muted-foreground">{profile.location}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="flex items-center gap-2 font-medium">
                <Phone className="h-4 w-4 text-violet-500" />
                Contact
              </p>
              <p className="mt-1 text-muted-foreground">{profile.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
