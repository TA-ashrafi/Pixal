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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { api } from "@/convex/_generated/api"
import { useConvexQuery } from "@/hooks/use-convex-query";
import { usePlanAccess } from "@/hooks/use-plan-access";
import React from 'react'
import { Crown } from "lucide-react";

const NewProjectModal = ({ isOpen, onClose }) => {
    const handelClose = () => {
        onClose();
    };

    const { data: projects } = useConvexQuery(api.projects.getUserProjects);
    const currentProjectCount = projects?.length || 0;

    const { isFree, canCreateProject } = usePlanAccess();
    const canCreate = canCreateProject(currentProjectCount);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handelClose}>
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

                    <div className="space-y-6 bg-amber-900" >
                        {isFree && currentProjectCount >= 2 && (
                        <Alert className="bg-amber-500/10 border-amber-500/20">
                            <Crown className="h-5 w-5 text-amber-400" />
                            <AlertDescription className="text-amber-300/80">
                                <div className="font-semibold text-amber-400 mb-1">
                                    {currentProjectCount === 2
                                        ? "Last Free Project"
                                        : "Project Limit Reached"}
                                </div>
                                {currentProjectCount === 2
                                    ? "This will be your last free project. Upgrade to Pixxel Pro for unlimited projects."
                                    : "Free plan is limited to 3 projects. Upgrade to Pixxel Pro to create more projects."}
                            </AlertDescription>
                        </Alert>
                         )}
                         




                         
                    </div>
                    <DialogFooter>Footer</DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default NewProjectModal;