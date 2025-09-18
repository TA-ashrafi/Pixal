"use client";

import { useParallax } from "@/hooks/use-parallax";
import { useEffect, useState } from "react";

export const FloatingShapes = () => {
  const scrollY = useParallax();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = [
    {
      id: 1,
      size: "w-96 h-96",
      position: "top-10 -left-20",
      gradient: "from-primary/30 via-purple-500/20 to-transparent",
      animation: "animate-float",
    },
    {
      id: 2,
      size: "w-80 h-80",
      position: "top-1/4 -right-16",
      gradient: "from-cyan-400/20 via-blue-500/30 to-transparent",
      animation: "animate-float-delayed",
    },
    {
      id: 3,
      size: "w-72 h-72",
      position: "bottom-32 -left-10",
      gradient: "from-purple-500/25 via-pink-500/20 to-transparent",
      animation: "animate-float",
    },
    {
      id: 4,
      size: "w-64 h-64",
      position: "bottom-10 -right-8",
      gradient: "from-emerald-400/20 via-cyan-500/25 to-transparent",
      animation: "animate-float-delayed",
    },
    {
      id: 5,
      size: "w-56 h-56",
      position: "top-1/2 left-1/3",
      gradient: "from-yellow-400/15 via-orange-500/20 to-transparent",
      animation: "animate-float",
    },
    {
      id: 6,
      size: "w-48 h-48",
      position: "top-3/4 right-1/3",
      gradient: "from-rose-400/20 via-pink-500/15 to-transparent",
      animation: "animate-float-delayed",
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 animate-gradient bg-[length:400%_400%]" />
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.position} bg-gradient-to-br ${shape.gradient} rounded-full blur-3xl ${shape.animation}`}
          style={{
            transform: `
              translateY(${scrollY * 0.3}px) 
              translateX(${(mousePosition.x - 50) * 0.1}px)
              rotate(${scrollY * 0.05}deg)
            `,
          }}
        />
      ))}
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      
      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
};
