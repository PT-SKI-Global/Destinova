import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, Sparkles } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 p-2 -ml-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Destinova</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-lg" data-testid="link-home">
              Beranda
            </Link>
            <Link href="/simulation" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-lg" data-testid="link-simulation">
              Simulasi
            </Link>
            <Link href="/comparison" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-lg" data-testid="link-comparison">
              Perbandingan
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" className="md:hidden" size="icon" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/simulation">
              <Button className="hidden md:inline-flex" data-testid="button-nav-login">
                Mulai Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
