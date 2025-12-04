import { Modal } from "../common/modal";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ComingSoonModal = ({ isOpen, onClose }: ComingSoonModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Coming Soon">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold">Coming Soon</p>
        <p className="text-lg">We are working on something great for you.</p>
      </div>
    </Modal>
  );
};
