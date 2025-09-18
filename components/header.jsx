"use client";

import React from "react";
import { LayoutDashboard, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (path.includes("/editor")) {
    return null; // Hide header on editor page
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-2xl bg-background/80 border-b border-white/10 py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? '' : 'glass-strong rounded-2xl px-8 py-4'
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Pixxel Logo"
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                  width={120}
                  height={32}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            {path === "/" && (
              <nav className="hidden lg:flex items-center space-x-8">
                {[
                  { href: "#features", label: "Features" },
                  { href: "#pricing", label: "Pricing" },
                  { href: "#about", label: "About" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-foreground/80 hover:text-foreground font-medium transition-all duration-300 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            )}

            {/* Auth Actions */}
            <div className="flex items-center gap-4">
              <Authenticated>
                <Link href="/dashboard">
                  <Button variant="glass" size="sm" className="hidden sm:flex group">
                    <LayoutDashboard className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Button>
                </Link>

                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-xl border-2 border-white/20 hover:border-primary/50 transition-all duration-300",
                      userButtonPopoverCard:
                        "shadow-2xl backdrop-blur-2xl bg-background/90 border border-white/20 rounded-2xl",
                      userPreviewMainIdentifier: "font-semibold text-foreground",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </Authenticated>

              <Unauthenticated>
                <SignInButton>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button variant="magnetic" size="sm">
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Button>
                </SignUpButton>
              </Unauthenticated>

              {/* Mobile Menu Button */}
              {path === "/" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width="100%" height={2} color="hsl(var(--primary))" />
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && path === "/" && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
          <div className="relative flex flex-col items-center justify-center h-full space-y-8">
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
