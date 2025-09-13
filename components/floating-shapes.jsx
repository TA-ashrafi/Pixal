<<<<<<< HEAD
"use client";

import { useParallax } from "@/hooks/use-parallax";

export const FloatingShapes = () => {
  const scrollY = useParallax();

=======
"use client"
import { useParallax } from '@/hooks/use-parallax';
import React from 'react'

const FloatingShapes = () => {
  const scrollY = useParallax();
>>>>>>> a953cef4ceed79b2e6dcec49d6d9999c1d5af249
  const shapes = [
    {
      id: 1,
      size: "w-72 h-72",
<<<<<<< HEAD
      position: "top-20 left-10",
=======
      position: "top-20 left-20",
>>>>>>> a953cef4ceed79b2e6dcec49d6d9999c1d5af249
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      size: "w-96 h-96",
      position: "top-1/3 right-10",
<<<<<<< HEAD
      gradient: "from-cyan-400 to-blue-500",
=======
      gradient: "from-cyan-400 to-blue-600",
>>>>>>> a953cef4ceed79b2e6dcec49d6d9999c1d5af249
    },
    {
      id: 3,
      size: "w-64 h-64",
      position: "bottom-20 left-1/4",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      size: "w-80 h-80",
      position: "bottom-1/3 right-1/4",
      gradient: "from-green-400 to-cyan-500",
    },
<<<<<<< HEAD
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
=======
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none ">
>>>>>>> a953cef4ceed79b2e6dcec49d6d9999c1d5af249
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.position} bg-gradient-to-r ${shape.gradient} rounded-full blur-3xl opacity-20 animate-pulse`}
          style={{
            transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.1}deg)`,
          }}
        />
      ))}
    </div>
<<<<<<< HEAD
  );
};
=======
  )
}

export default FloatingShapes
>>>>>>> a953cef4ceed79b2e6dcec49d6d9999c1d5af249
