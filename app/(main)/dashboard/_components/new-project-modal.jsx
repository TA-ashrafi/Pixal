import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'

const NewProjectModal = ({ isOpen , onClose}) => {
const handelClose = () => {
    onClose();
}

  return (
    <>
    <Dialog open={isOpen} onOpenChange = {handelClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>Footer</DialogFooter>
  </DialogContent>
</Dialog>
    </>
  )
};

export default NewProjectModal;