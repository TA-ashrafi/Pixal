"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Brain, 
  Rocket, 
  Shield, 
  Heart,
  ArrowRight,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Our advanced machine learning algorithms understand your creative intent and deliver professional results automatically.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: "Lightning Performance",
      description: "Optimized for speed without compromising quality. Process images in seconds, not minutes.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your images are processed securely and never stored on our servers. Complete privacy guaranteed.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Made for Creators",
      description: "Built by designers, for designers. Every feature is crafted with the creative workflow in mind.",
      gradient: "from-red-500 to-rose-500"
    }
  ];

  const benefits = [
    "Professional results in seconds",
    "No technical expertise required",
    "Works with any image format",
    "Cloud-based processing power",
    "Regular feature updates",
    "24/7 customer support"
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              About Pixxel
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8">
              <span className="text-foreground">Redefining </span>
              <span className="text-gradient">Image Editing</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We believe that powerful image editing should be accessible to everyone. 
              That's why we've built Pixxel - an AI-powered platform that brings 
              professional-grade editing tools to your fingertips.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-center transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button variant="magnetic" size="lg" className="group">
              Learn More About Our Mission
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right content - Interactive features */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}>
            <div className="relative">
              {/* Main feature display */}
              <div className="glass-strong rounded-3xl p-8 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center mb-6 transition-all duration-500`}>
                  <features[activeFeature].icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {features[activeFeature].title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>

              {/* Feature selector */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    className={`glass rounded-2xl p-4 text-left transition-all duration-300 ${
                      activeFeature === index 
                        ? 'ring-2 ring-primary/50 bg-primary/5' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 transition-transform duration-300 ${
                      activeFeature === index ? 'scale-110' : ''
                    }`}>
                      <feature.icon className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {feature.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeFeature === index 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};