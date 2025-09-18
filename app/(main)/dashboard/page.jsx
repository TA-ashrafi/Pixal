"use client";

import React, { useState } from "react";
import { Plus, Image, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { NewProjectModal } from "./_components/new-project-modal";
import { ProjectGrid } from "./_components/project-grid";

export default function DashboardPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Get user's projects
  const { data: projects, isLoading } = useConvexQuery(
    api.projects.getUserProjects
  );

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Your Creative Workspace
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-foreground">
              Your Projects
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Create, edit, and manage your AI-powered image designs. 
              Your creative journey starts here.
            </p>
          </div>

          <Button
            onClick={() => setShowNewProjectModal(true)}
            variant="magnetic"
            size="xl"
            className="group self-start lg:self-center"
          >
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            New Project
          </Button>
        </div>

        {/* Quick Stats */}
        {projects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </div>
            
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Active</p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
              </div>
            </div>
            
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Pro</p>
                  <p className="text-sm text-muted-foreground">AI Tools</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6 animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <p className="text-muted-foreground">Loading your projects...</p>
          </div>
        ) : projects && projects.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
              <p className="text-sm text-muted-foreground">
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </p>
            </div>
            <ProjectGrid projects={projects} />
          </div>
        ) : (
          <EmptyState onCreateProject={() => setShowNewProjectModal(true)} />
        )}

        {/* New Project Modal */}
        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
        />
      </div>
    </div>
  );
}

// Empty state when user has no projects
function EmptyState({ onCreateProject }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center animate-float">
          <Image className="h-16 w-16 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-bounce">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      </div>

      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Your Creative Journey
        <br />
        <span className="text-gradient">Starts Here</span>
      </h3>

      <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
        Upload an image and transform it with our powerful AI editing tools. 
        Crop, enhance, remove backgrounds, and create stunning visuals in seconds.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onCreateProject}
          variant="magnetic"
          size="xl"
          className="group"
        >
          <Zap className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          Create First Project
        </Button>
        
        <Button
          variant="glass"
          size="xl"
          className="group"
        >
          <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          Explore Features
        </Button>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
        {[
          { icon: "🎨", title: "AI Enhancement", desc: "Automatic image improvement" },
          { icon: "✂️", title: "Smart Cropping", desc: "Intelligent composition" },
          { icon: "🖼️", title: "Background Magic", desc: "Remove or replace instantly" }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
