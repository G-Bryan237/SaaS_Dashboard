import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WelcomeAnimation from "@/components/3d/WelcomeAnimation";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Animation Background */}
      <WelcomeAnimation />
      
      {/* Your existing welcome page content */}
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <main className="max-w-3xl mx-auto flex flex-col items-center space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Welcome to Your SaaS Dashboard
              </h1>
              <p className="text-muted-foreground">
                A modern dashboard with advanced analytics and powerful management tools
              </p>
            </div>

            <div className="flex justify-center">
              <Image 
                src="/dashboard-preview.png"
                alt="Dashboard Preview" 
                width={600} 
                height={400}
                className="rounded-lg border shadow-md"
                priority
              />
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground max-w-xl">
                Access your personalized dashboard to manage users, view analytics, 
                generate reports, and configure your settings in one place.
              </p>
              
              <Link href="/dashboard" passHref>
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </main>

          <footer className="mt-auto py-6">
            <p className="text-sm text-muted-foreground">
              © SaaS Dashboard. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
