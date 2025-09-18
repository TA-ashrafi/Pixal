import { Edit, Trash2, Calendar, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

export default function ProjectCard({ project, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);
  const { mutate: deleteProject, isLoading } = useConvexMutation(
    api.projects.deleteProject
  );

  const lastUpdated = formatDistanceToNow(new Date(project.updatedAt), {
    addSuffix: true,
  });

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        await deleteProject({ projectId: project._id });
        toast.success("Project deleted successfully");
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <div 
      className="group relative transition-all duration-500 hover:scale-[1.02] card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <Card className="relative glass-strong rounded-3xl overflow-hidden border-0 transition-all duration-500">
      {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative overflow-hidden">
        {project.thumbnailUrl && (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button 
              variant="glass" 
              size="sm" 
              onClick={onEdit} 
              className="backdrop-blur-xl bg-white/20 hover:bg-white/30 border-white/30"
            >
              <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="backdrop-blur-xl bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-300 hover:text-red-200"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>

          {/* Status indicator */}
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          </div>
      </div>

      {/* Project Info */}
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-foreground text-lg truncate flex-1 mr-2">
          {project.title}
        </h3>
            <Badge variant="secondary" className="text-xs bg-muted/50 text-muted-foreground border-0">
              <Maximize className="h-3 w-3 mr-1" />
              {project.width} × {project.height}
            </Badge>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Updated {lastUpdated}</span>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000"
                style={{ width: isHovered ? '100%' : '0%' }}
              />
            </div>
          </div>
      </CardContent>
      </Card>
    </div>
  );
}
