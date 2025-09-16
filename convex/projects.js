import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";

export const create  = mutation({
  args:{
    title: v.string(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    width: v.number(),
    height: v.number(),
    canvasState: v.optional(v.any()),
  },
  handler: async (ctx , args) => {
    const user = await ctx.runQuery(internal.user.getCurrentUser);
    if(user.plan == "free"){
      const projectCount = await ctx.db
      .query("projects")
      .withIndex("by_user" , (q) => q.eq("userId", user.id))
      .collect();

      if (projectCount.length >= 3) {
        throw new Error("Project limit reached for Free plan. Please upgrade to Pro for more projects.");
      }
    }

    const projectId = await ctx.db.insert("Projects" , {
      title: args.title,
      userId: user.id,
      originalImageUrl: args.originalImageUrl,
      currentImageUrl: args.currentImageUrl,
      thumbnailUrl: args.thumbnailUrl,
      width: args.width,
      height: args.height,
      canvasState: args.canvasState,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(user._id,{
      projectsUsed: user.projectsUsed + 1,
      lastActiveAt: Date.now(),
    });

    return projectId;
  },
});


export const getUserProjects = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user_updated", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return projects;
  }
});


export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    const lproject = await ctx.db.get(args.projectId);
    if (!lproject) {
      throw new Error("Project not found");
    }

    if (!(user || lproject.userId !== user._id)) {
      throw new Error("Access denied");
    }

    await ctx.db.delete(args.projectId);

    await ctx.db.patch(user._id, {
      projectused : Math.max(0, user.projectsUsed - 1),
      lastActiveAt: Date.now(),
    });

    return { success: true};
  },
});