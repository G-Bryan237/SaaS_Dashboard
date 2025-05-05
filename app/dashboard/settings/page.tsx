"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Upload, User, Bell, Shield, CreditCard, UserCog, Building2, Key, AlertCircle, Moon, Sun, Globe, BellRing, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationPush, setNotificationPush] = useState(true);
  const [notificationSms, setNotificationSms] = useState(false);
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
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="gap-x-2">
          <TabsTrigger value="preferences" className="gap-2">
            <User className="h-4 w-4" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <UserCog className="h-4 w-4" /> Team
          </TabsTrigger>
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="h-4 w-4" /> Organization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
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
              <CardFooter>
                <Button onClick={savePreferences}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">By Communication Channel</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationEmail}
                    onCheckedChange={setNotificationEmail}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={notificationPush}
                    onCheckedChange={setNotificationPush}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important alerts via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationSms}
                    onCheckedChange={setNotificationSms}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Choose what types of notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Login attempts, password changes, etc.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      New features, maintenance, etc.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Product News</Label>
                    <p className="text-sm text-muted-foreground">
                      New products, updates, and offers
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password regularly to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Two-factor authentication is not enabled yet.</AlertTitle>
                <AlertDescription>
                  Enable two-factor authentication for enhanced account security.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Authenticator App</Label>
                  <p className="text-sm text-muted-foreground">
                    Use an authenticator app to generate one-time codes
                  </p>
                </div>
                <Button variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Setup
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive verification codes via SMS
                  </p>
                </div>
                <Button variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">Pro Plan</h3>
                    <p className="text-muted-foreground">$19.99/month</p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" /> Up to 10 team members
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" /> 50GB storage
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" /> Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" /> Custom reporting
                  </li>
                  <li className="flex items-center">
                    <X className="mr-2 h-4 w-4 text-muted-foreground" /> API access
                  </li>
                </ul>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline" className="text-destructive">Cancel Subscription</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 09/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <Button variant="outline" className="mt-2">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your recent invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 1, 2023</TableCell>
                    <TableCell>Pro Plan - Monthly</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-50">Paid</Badge></TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Download</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 1, 2023</TableCell>
                    <TableCell>Pro Plan - Monthly</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-50">Paid</Badge></TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Download</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feb 1, 2023</TableCell>
                    <TableCell>Pro Plan - Monthly</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-50">Paid</Badge></TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Download</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">Team management settings will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Manage your organization details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">Organization settings will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
