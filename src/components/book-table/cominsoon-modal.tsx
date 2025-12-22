import { Modal } from "../common/modal";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComingSoonModal = ({ isOpen, onClose }: ComingSoonModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=" Event Details"
      className="sm:max-w-[90vw] lg:max-w-[80vw]"
      containerClassname="!p-0"
      defaultPadding={false}
    >
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-center text-gray-600">
          Check out our upcoming event details below
        </p>

        <div className="w-full h-[70vh] min-h-[500px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <iframe
            src="/event.pdf"
            frameBorder="0"
            className="w-full h-full"
            title="Event PDF"
            loading="lazy"
          />
        </div>

        <p className="text-sm text-gray-500 text-center">
          You can place an order for the event by calling{" "}
          <span className="font-bold">88071190</span>.
        </p>
      </div>
    </Modal>
  );
};
