"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap, Wand2, Image as ImageIcon } from "lucide-react";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic background gradient that follows mouse */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary)) 0%, 
            transparent 50%)`
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Main heading with staggered animation */}
        <div className={`transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              Powered by Advanced AI
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block text-gradient animate-gradient bg-[length:400%_400%]">
              Create Beyond
            </span>
            <span className="block text-foreground">
              Imagination
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your images with professional AI-powered editing tools. 
            Crop, enhance, remove backgrounds, and create stunning visuals in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/dashboard">
              <Button variant="magnetic" size="xl" className="group">
                <Zap className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Start Creating Free
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Button 
              variant="glass" 
              size="xl" 
              className="group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Play className={`h-5 w-5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Interactive Demo Interface */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}>
          <div className="relative max-w-6xl mx-auto">
            {/* Main demo container */}
            <div className="glass-strong rounded-3xl p-8 relative overflow-hidden group">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              {/* Browser chrome */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100" />
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200" />
                </div>
                <div className="text-muted-foreground text-sm font-medium">
                  Pixxel AI Editor
                </div>
              </div>

              {/* Tool palette */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: "✂️", label: "Smart Crop", color: "from-blue-500 to-cyan-500" },
                  { icon: "🎨", label: "AI Enhance", color: "from-purple-500 to-pink-500" },
                  { icon: "🖼️", label: "Background", color: "from-green-500 to-emerald-500" },
                  { icon: "✨", label: "Magic Tools", color: "from-orange-500 to-yellow-500" },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer group/tool"
                  >
                    <div className="text-3xl mb-3 group-hover/tool:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      {tool.label}
                    </div>
                    <div className={`h-1 w-full bg-gradient-to-r ${tool.color} rounded-full opacity-60`} />
                  </div>
                ))}
              </div>

              {/* Canvas area */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-purple-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center relative overflow-hidden group/canvas">
                  {/* Animated grid */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }} />
                  </div>
                  
                  {/* Center content */}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center group-hover/canvas:scale-110 transition-transform duration-500">
                      <ImageIcon className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-foreground font-semibold text-lg">
                      Your Creative Canvas
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Drag & drop to start editing
                    </p>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-primary/30 rounded-full animate-float" />
                  <div className="absolute top-8 right-8 w-6 h-6 bg-purple-500/30 rounded-full animate-float-delayed" />
                  <div className="absolute bottom-6 left-8 w-4 h-4 bg-cyan-400/30 rounded-full animate-float" />
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: <Wand2 className="h-6 w-6" />,
                  title: "AI-Powered",
                  description: "Advanced algorithms for perfect results"
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Lightning Fast",
                  description: "Process images in seconds, not minutes"
                },
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: "Professional Quality",
                  description: "Studio-grade editing tools at your fingertips"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};