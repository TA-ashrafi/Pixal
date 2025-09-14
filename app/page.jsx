import Features from '@/components/features';
import HeroSection from '@/components/hero';
import Pricing from '@/components/pricing';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const stats = [
    { label: 'Images Processed', value: 10000, suffix: '+' },
    { label: 'Active User', value: 500, suffix: '+' },
    { label: 'AI Transformation', value: 45000, suffix: '+' },
    { label: 'User Satisfaction', value: 98, suffix: '%' },
  ];

  return (
    <div className="pt-40">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <section className='py-20'>
        <div className='max-w-6xl mx-auto px-6 '>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4.4 '>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 m-4">
                <div
                  className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* feature */}
              
<Features/>


      {/* Pricing */}
<Pricing/>




      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">
            Ready To{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Create Something Amazing?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already using AI to transform their images and bring their vision to life.
          </p>
          <Link href="/dashboard">
            <Button variant="primary" size="xl">Start Creating Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;