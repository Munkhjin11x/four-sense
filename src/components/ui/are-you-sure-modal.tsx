import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Modal } from "./modal";

interface ModalType {
  isOpen: boolean;
  onClose: () => void;
  onApproval: () => void;
  title: string;
}

export const AreYouSureModal = (props: ModalType) => {
  const { isOpen, onClose, onApproval, title } = props;

  const handleApproval = () => {
    try {
      onApproval();
      onClose();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-4 p-4">
        <p className="mb-2 text-center text-2xl font-semibold text-warning-400">
          Are you sure you want to this {title} ?
        </p>
      </div>
      <div className="flex h-fit w-full gap-2 border-t border-gray-200 p-4">
        <Button className="h-full w-full" variant={"outline"} onClick={onClose}>
          No
        </Button>
        <Button className="h-full w-full" onClick={handleApproval}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};
