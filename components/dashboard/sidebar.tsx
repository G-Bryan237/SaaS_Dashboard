"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  BarChart3,
  Layers,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";

// Define sidebar nav items
const sidebarNavItems = [
  {
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    label: "Dashboard",
  },
  {
    path: "/dashboard/users",
    icon: <Users className="h-5 w-5" />,
    label: "Users",
  },
  {
    path: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Analytics",
    hasSubmenu: true,
    submenuItems: [
      {
        path: "/dashboard/analytics/sales",
        label: "Sales"
      },
      {
        path: "/dashboard/analytics/traffic",
        label: "Traffic"
      },
      {
        path: "/dashboard/analytics/performance",
        label: "Performance"
      }
    ]
  },
  {
    path: "/dashboard/products",
    icon: <Layers className="h-5 w-5" />,
    label: "Products",
  },
  {
    path: "/dashboard/reports",
    icon: <FileText className="h-5 w-5" />,
    label: "Reports",
  },
  {
    path: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
  },
];

interface SidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isMobile, isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Check if the current path matches a submenu item to keep it open
  useEffect(() => {
    sidebarNavItems.forEach(item => {
      if (item.hasSubmenu && item.submenuItems?.some(subItem => pathname.startsWith(subItem.path))) {
        setOpenSubmenu(item.path);
      }
    });
  }, [pathname]);

  const toggleSubmenu = (path: string) => {
    setOpenSubmenu(prev => prev === path ? null : path);
  };

  return (
    <aside
      className={cn(
        "fixed top-14 left-0 z-20 h-[calc(100vh-3.5rem)] w-64 border-r bg-background transition-transform lg:static lg:h-full",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {sidebarNavItems.map((item) => {
              const isActive = item.path === pathname || 
                (item.hasSubmenu && item.submenuItems?.some(subItem => pathname.startsWith(subItem.path)));
              
              return (
                <div key={item.path}>
                  {item.hasSubmenu ? (
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-between",
                        isActive && "text-primary"
                      )}
                      onClick={() => toggleSubmenu(item.path)}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </span>
                      {openSubmenu === item.path ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  ) : (
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary",
                        isActive
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  )}
                  
                  {/* Submenu */}
                  {item.hasSubmenu && openSubmenu === item.path && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenuItems?.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary",
                            pathname.startsWith(subItem.path)
                              ? "bg-secondary text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          <span className="ml-3">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="border-t p-4 space-y-2">
          {/* Preferences link */}
          <Link href="/dashboard/settings/preferences" className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary text-muted-foreground">
            <User className="mr-2 h-5 w-5" />
            <span>Preferences</span>
          </Link>
          
          {/* Logout button */}
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
