import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { CustomDialogDrawerProps } from '@/interfaces';

const CustomDialog: React.FC<CustomDialogDrawerProps> = ({
  open,
  setOpen,
  trigger,
  title,
  description,
  children,
  contentClassName,
  headerClassName,
  showLastTwo = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName} showLastTwo={showLastTwo}>
        {(title || description) && (
          <DialogHeader className={headerClassName}>
            <DialogTitle className="sr-only">{title || 'Dialog'}</DialogTitle>
            <DialogDescription className="sr-only">
              {description || 'Dialog description'}
            </DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
