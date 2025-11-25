import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function InfoDialog({ open, onOpenChange, title, description }: InfoDialogProps) {
  const defaultTitle = title || 'Information';
  const defaultDescription = description || '';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#2E2E2E] border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">{defaultTitle}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-base">
            {defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)} className="bg-[#FDB813] hover:bg-[#e5a711] text-black">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
