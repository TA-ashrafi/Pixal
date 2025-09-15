import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api"
import { useConvexQuery } from "@/hooks/use-convex-query";
import { usePlanAccess } from "@/hooks/use-plan-access";
import React from 'react'

const NewProjectModal = ({ isOpen , onClose}) => {
const handelClose = () => {
    onClose();
};

const { data : projects } = useConvexQuery(api.projects.getUserProjects);
const currentProjectCount = projects?.length || 0; 

const {isFree , canCreateProject} = usePlanAccess();
const canCreate = canCreateProject(currentProjectCount);

  return (
    <>
    <Dialog open={isOpen} onOpenChange = {handelClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-2xl font-bbold text-white">Create New Project</DialogTitle>
      {/* <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription> */}

      {isFree && (
        <Badge variant="secondary" className="bg-slate-700 text-white/70">
            {currentProjectCount}/3 Projects
        </Badge>
      )}
    </DialogHeader>

    <DialogFooter>Footer</DialogFooter>
  </DialogContent>
</Dialog>
    </>
  )
};

export default NewProjectModal;