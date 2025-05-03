"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Moon, Sun, Globe, BellRing, RefreshCw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PreferencesPage() {
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    notifications: true,
    compactMode: false,
    autoUpdate: true,
    timeFormat: "24h"
  });
  
  const handleSwitchChange = (name: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const savePreferences = () => {
    // In a real app, this would save to user settings in an API
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully."
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Preferences</h1>
        <Button onClick={savePreferences}>Save Changes</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the application looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Theme</Label>
              <RadioGroup 
                value={preferences.theme} 
                onValueChange={(value) => handleRadioChange("theme", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="flex items-center gap-1.5">
                    <Sun className="h-4 w-4" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="flex items-center gap-1.5">
                    <Moon className="h-4 w-4" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system">System</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce spacing and font size
                </p>
              </div>
              <Switch 
                checked={preferences.compactMode}
                onCheckedChange={() => handleSwitchChange("compactMode")}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Regional</CardTitle>
            <CardDescription>Language and format preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={preferences.language}
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger className="w-full" id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="es">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Español</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="fr">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Français</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="de">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Deutsch</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <Label>Time Format</Label>
              <RadioGroup 
                value={preferences.timeFormat} 
                onValueChange={(value) => handleRadioChange("timeFormat", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12h" id="time-12h" />
                  <Label htmlFor="time-12h">12-hour (AM/PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="time-24h" />
                  <Label htmlFor="time-24h">24-hour</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for important updates
                </p>
              </div>
              <Switch 
                checked={preferences.notifications}
                onCheckedChange={() => handleSwitchChange("notifications")}
              />
            </div>
            
            {preferences.notifications && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <BellRing className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Notification settings are enabled</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System</CardTitle>
            <CardDescription>General system preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <Label>Auto Update Dashboard</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically refresh dashboard data
                </p>
              </div>
              <Switch 
                checked={preferences.autoUpdate}
                onCheckedChange={() => handleSwitchChange("autoUpdate")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
