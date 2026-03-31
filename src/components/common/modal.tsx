"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { ReactNode } from "react";
interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  rightSideContent?: ReactNode;
  className?: string;
  defaultPadding?: boolean;
  containerClassname?: string;
  onWheel?: (e: React.WheelEvent) => void;
  closeActive?: boolean;
  overlayClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description = "",
  isOpen,
  onClose,
  children,
  rightSideContent,
  className,
  defaultPadding = true,
  containerClassname = "",
  closeActive = true,
  onWheel,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent
          className={cn(
            "flex max-h-[100dvh] min-h-0 w-[calc(100%-1rem)] max-w-lg flex-col overflow-hidden !p-0 sm:max-h-[min(90dvh,800px)] sm:w-full",
            className
          )}
          onWheel={onWheel} // Pass the onWheel prop
        >
          <DialogHeader className="flex h-fit w-full min-w-0 shrink-0 flex-row items-center justify-between gap-1.5 space-y-0 border-b border-gray-200 p-3 sm:p-4">
            <div>
              <div className="flex items-center gap-2 ">
                {closeActive && (
                  <DialogClose>
                    <XIcon />
                  </DialogClose>
                )}
                <DialogTitle>{title}</DialogTitle>
              </div>
              <DialogDescription>{description}</DialogDescription>
            </div>
            <div>{rightSideContent && rightSideContent}</div>
          </DialogHeader>
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]",
              defaultPadding && `p-3 sm:p-4`,
              containerClassname
            )}
          >
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
