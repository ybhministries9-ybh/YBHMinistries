import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface DiscardConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function DiscardConfirmDialog({ open, onOpenChange, onConfirm, title, description }: DiscardConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const defaultTitle = title || 'Discard changes?';
  const defaultDescription = description || 'You have an unsaved entry open. Discard it and continue?';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#2E2E2E] border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">
            {defaultTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-base">
            {defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#1a1a1a] hover:bg-[#2E2E2E] text-white border-gray-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-[#FDB813] hover:bg-[#e5a610] text-black">
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DiscardConfirmDialog;
