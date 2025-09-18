"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";

export const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 relative overflow-hidden"
    >
      {/* Dynamic background */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary)) 0%, 
            transparent 50%)`
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyan-400/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong text-sm font-medium mb-8">
              <Star className="h-4 w-4 text-primary animate-pulse" />
              Join 2,500+ Happy Creators
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-foreground">Ready to </span>
              <span className="text-gradient animate-gradient bg-[length:400%_400%]">
                Transform
              </span>
              <br />
              <span className="text-foreground">Your Images?</span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of creators who are already using AI to bring their creative vision to life. 
              Start your journey today - it's completely free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/dashboard">
                <Button variant="magnetic" size="xl" className="group">
                  <Zap className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  Start Creating Now
                  <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button variant="glass" size="xl" className="group">
                <Sparkles className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                Explore Features
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                {
                  icon: "🚀",
                  title: "Get Started in Seconds",
                  description: "No downloads, no setup required"
                },
                {
                  icon: "💎",
                  title: "Professional Results",
                  description: "Studio-quality editing tools"
                },
                {
                  icon: "🔒",
                  title: "100% Secure",
                  description: "Your images stay private"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 delay-${index * 100} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};