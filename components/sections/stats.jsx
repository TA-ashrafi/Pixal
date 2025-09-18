"use client";

import React, { useState, useRef, useEffect } from "react";
import { TrendingUp, Users, Zap, Award } from "lucide-react";

const AnimatedCounter = ({ target, suffix = "", duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= target) {
            clearInterval(timer);
            return target;
          }
          return next;
        });
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, hasStarted, target, duration]);

  return (
    <span className="text-gradient font-black">
      {Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
};

const StatCard = ({ stat, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
      
      {/* Card */}
      <div className="relative glass-strong rounded-3xl p-8 text-center transition-all duration-500 group-hover:scale-105">
        {/* Icon */}
        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
          <stat.icon className="h-8 w-8 text-white" />
        </div>

        {/* Number */}
        <div className="text-4xl lg:text-5xl font-black mb-2">
          <AnimatedCounter 
            target={stat.value} 
            suffix={stat.suffix} 
            isVisible={isVisible}
          />
        </div>

        {/* Label */}
        <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
          {stat.label}
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground/70 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const stats = [
    {
      icon: TrendingUp,
      value: 50000,
      suffix: "+",
      label: "Images Processed",
      description: "High-quality transformations delivered",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      value: 2500,
      suffix: "+",
      label: "Active Creators",
      description: "Artists and designers trust our platform",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      value: 150000,
      suffix: "+",
      label: "AI Operations",
      description: "Intelligent edits performed monthly",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      value: 99,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Users love our editing experience",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            <span className="text-foreground">Trusted by </span>
            <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a growing community of creators who are transforming their workflow with AI-powered editing
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};