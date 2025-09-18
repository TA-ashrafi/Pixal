"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Crop, 
  Palette, 
  Wand2, 
  Maximize2, 
  Type, 
  Eye,
  ArrowRight,
  Sparkles
} from "lucide-react";

const FeatureCard = ({ feature, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            ${feature.color}20 0%, 
            transparent 50%)`
        }}
      />
      
      {/* Card content */}
      <div className="relative glass-strong rounded-3xl p-8 h-full transition-all duration-500 group-hover:scale-[1.02] card-hover">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <feature.icon className="h-8 w-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-gradient transition-all duration-300">
          {feature.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Features list */}
        <ul className="space-y-2 mb-6">
          {feature.features.map((item, idx) => (
            <li key={idx} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
              {item}
            </li>
          ))}
        </ul>

        {/* Hover indicator */}
        <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
          <span className="text-sm font-medium mr-2">Explore feature</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      icon: Crop,
      title: "Smart Crop & Resize",
      description: "Intelligent cropping with AI-powered composition analysis and aspect ratio optimization.",
      gradient: "from-blue-500 to-cyan-500",
      color: "rgb(59, 130, 246)",
      features: [
        "AI-powered composition analysis",
        "Multiple aspect ratio presets",
        "Smart object detection",
        "Batch processing support"
      ]
    },
    {
      icon: Palette,
      title: "AI Background Magic",
      description: "Remove, replace, or enhance backgrounds with precision using advanced AI algorithms.",
      gradient: "from-purple-500 to-pink-500",
      color: "rgb(147, 51, 234)",
      features: [
        "One-click background removal",
        "Smart edge detection",
        "Background replacement library",
        "Seamless blending technology"
      ]
    },
    {
      icon: Wand2,
      title: "Color Enhancement",
      description: "Professional-grade color correction and enhancement tools powered by machine learning.",
      gradient: "from-green-500 to-emerald-500",
      color: "rgb(34, 197, 94)",
      features: [
        "Auto color correction",
        "HDR tone mapping",
        "Selective color adjustments",
        "Real-time preview"
      ]
    },
    {
      icon: Maximize2,
      title: "AI Image Extender",
      description: "Expand your canvas in any direction with AI-generated content that matches your image.",
      gradient: "from-orange-500 to-yellow-500",
      color: "rgb(249, 115, 22)",
      features: [
        "Generative fill technology",
        "Context-aware expansion",
        "Multiple direction support",
        "Seamless integration"
      ]
    },
    {
      icon: Type,
      title: "Smart Typography",
      description: "Add beautiful text with advanced typography controls and AI-powered font suggestions.",
      gradient: "from-red-500 to-rose-500",
      color: "rgb(239, 68, 68)",
      features: [
        "Font pairing suggestions",
        "Text effects library",
        "Responsive text scaling",
        "Multi-language support"
      ]
    },
    {
      icon: Eye,
      title: "AI Enhancement Suite",
      description: "Comprehensive image enhancement with noise reduction, sharpening, and quality improvement.",
      gradient: "from-indigo-500 to-purple-500",
      color: "rgb(99, 102, 241)",
      features: [
        "Noise reduction algorithms",
        "Smart sharpening",
        "Upscaling technology",
        "Quality optimization"
      ]
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 mb-20">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            Powerful Features
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient">Everything You Need</span>
            <br />
            <span className="text-foreground">To Create Amazing</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional-grade editing tools powered by cutting-edge AI technology. 
            Transform your creative workflow with intelligent automation.
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-400/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};