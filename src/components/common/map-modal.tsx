import { Modal } from "./modal";

export const MapModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div>
      <Modal
        className="h-full w-full max-w-[600px] sm:w-[700px]"
        title="FourSenses Coctail Bar"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.2346088864842!2d106.9063079!3d47.9124978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96934eb66f69f1%3A0x15696163737c5ef3!2sFourSenses%20Coctail%20Bar!5e0!3m2!1sen!2smn!4v1740719233086!5m2!1sen!2smn"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};
