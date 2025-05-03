"use client";

import { useState, useEffect } from "react";
import { Bell, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { useNotificationStore } from "@/lib/stores/notification-store";
import Link from "next/link";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { theme, setTheme } = useTheme();
  const { notifications, unreadCount } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("light"); // Default to light to avoid undefined

  // Only show the theme toggle after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Update the current theme state to match the actual theme
    setCurrentTheme(theme || "light");
  }, [theme]);

  // Ensure toggleTheme is using the most recent theme state
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    console.log("Toggling theme from", currentTheme, "to", newTheme);
    setTheme(newTheme);
    setCurrentTheme(newTheme); // Update our local state too
  };

  // For debugging
  useEffect(() => {
    if (mounted) {
      console.log("Theme provider theme:", theme);
      console.log("Current local theme state:", currentTheme);
      console.log("HTML class:", document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
  }, [theme, currentTheme, mounted]);

  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
        >
          <div className="h-5 w-5 flex items-center justify-center">
            {mounted && (currentTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />)}
          </div>
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                {unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 z-50 rounded-md border bg-popover text-popover-foreground shadow-md">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/notifications">View all</Link>
                </Button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b last:border-b-0 ${
                        !notification.read
                          ? "bg-accent/40"
                          : "hover:bg-accent/20"
                      }`}
                    >
                      <div className="flex gap-2 items-start">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "error"
                              ? "bg-destructive"
                              : notification.type === "warning"
                              ? "bg-amber-500"
                              : notification.type === "success"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.createdAt).toLocaleTimeString()} · {
                              notification.priority
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Link href="/dashboard/profile">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
