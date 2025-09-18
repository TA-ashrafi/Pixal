"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, Crown, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const PricingCard = ({ plan, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { has } = useAuth();
  
  const isCurrentPlan = plan.id ? has?.({ plan: plan.id }) : false;

  const handleUpgrade = async () => {
    if (isCurrentPlan || !plan.planId) return;

    try {
      if (window.Clerk && window.Clerk.__internal_openCheckout) {
        await window.Clerk.__internal_openCheckout({
          planId: plan.planId,
          planPeriod: "month",
          subscriberType: "user",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${plan.featured ? "lg:scale-110 z-10" : ""}`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-primary to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}

      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
        plan.featured 
          ? "from-primary/20 to-purple-500/20" 
          : "from-primary/5 to-purple-500/5"
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

      {/* Card */}
      <div className={`relative glass-strong rounded-3xl p-8 h-full transition-all duration-500 ${
        isHovered ? "scale-[1.02]" : ""
      } ${plan.featured ? "border-primary/30" : ""}`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
            <plan.icon className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
          
          <div className="mb-4">
            <span className="text-5xl font-black text-gradient">${plan.price}</span>
            {plan.price > 0 && <span className="text-muted-foreground ml-2">/month</span>}
          </div>
          
          <p className="text-muted-foreground text-sm">{plan.description}</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant={plan.featured ? "magnetic" : "glass"}
          size="lg"
          className="w-full group"
          onClick={handleUpgrade}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? (
            <>
              <Check className="h-5 w-5" />
              Current Plan
            </>
          ) : (
            <>
              {plan.buttonText}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {/* Additional info */}
        {plan.note && (
          <p className="text-xs text-muted-foreground/70 text-center mt-4">
            {plan.note}
          </p>
        )}
      </div>
    </div>
  );
};

export const PricingSection = () => {
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

  const plans = [
    {
      id: "free_user",
      name: "Free",
      price: 0,
      description: "Perfect for getting started with basic editing",
      icon: Sparkles,
      gradient: "from-gray-500 to-gray-600",
      features: [
        "3 projects maximum",
        "20 exports per month",
        "Basic crop & resize tools",
        "Color adjustment controls",
        "Text editing capabilities",
        "Standard image formats",
        "Community support"
      ],
      buttonText: "Get Started Free",
      note: "No credit card required"
    },
    {
      id: "pro",
      name: "Pro",
      price: 12,
      description: "Unlock the full power of AI-driven editing",
      icon: Crown,
      gradient: "from-primary to-purple-500",
      featured: true,
      planId: "cplan_2ywZwXjYQQipWYxjCmFZCgCgsTZ",
      features: [
        "Unlimited projects & exports",
        "All AI editing tools included",
        "Advanced background removal",
        "AI image extension & enhancement",
        "Smart upscaling technology",
        "Priority processing speed",
        "Premium support & tutorials",
        "Early access to new features"
      ],
      buttonText: "Upgrade to Pro",
      note: "Cancel anytime, no questions asked"
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Zap className="h-4 w-4 text-primary" />
            Simple Pricing
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-foreground">Choose Your </span>
            <span className="text-gradient">Creative Power</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade when you're ready for more. 
            No hidden fees, no surprises - just powerful editing tools.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional info */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <p className="text-muted-foreground mb-6">
            Trusted by thousands of creators worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["30-day money back", "Cancel anytime", "Secure payments", "24/7 support"].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};