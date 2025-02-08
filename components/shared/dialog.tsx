import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogModalProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  children?: ReactNode;
  title?: string;
  description?: string;
}

function DialogModal({
  openDialog,
  setOpenDialog,
  children,
  title,
  description,
}: DialogModalProps) {
  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <DialogContent dir="rtl">
        <DialogHeader className="flex items-center md:items-start ">
          {title && <DialogTitle> {title}</DialogTitle>}
          {description && <DialogDescription> {description}</DialogDescription>}
        </DialogHeader>

        {/* Dialog Body with Input Fields for New Person */}
        {children}

        {/* Dialog Footer */}
      </DialogContent>
    </Dialog>
  );
}

export default DialogModal;
