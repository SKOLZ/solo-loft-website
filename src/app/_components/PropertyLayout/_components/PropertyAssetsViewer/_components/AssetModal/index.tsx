import ReactModal from "react-modal";
import { AssetCarousel } from "../AssetCarousel";
import Image from "next/image";
import { PropertyFragment } from "@/generated/graphql";
import styles from "./styles.module.scss";

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  photos: PropertyFragment["photos"];
  modalSliderRef: any;
  initialSlide: number;
  onSlideChange: (oldIndex: number, index: number) => void;
}

ReactModal.setAppElement("body");

export const AssetModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  photos,
  modalSliderRef,
  initialSlide,
  onSlideChange,
}) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <>
        <button
          className={styles.modalCloseButton}
          onClick={closeModal}
          aria-label="Close"
        >
          <i className="ic ic-X" />
        </button>
        <AssetCarousel
          isSingle={photos.length === 1}
          elements={photos}
          className={styles.modalCarousel}
          arrowClassName={styles.modalCarouselArrow}
          arrowVariant="full"
          sliderRef={modalSliderRef}
          settings={{
            initialSlide: initialSlide,
            beforeChange: onSlideChange,
          }}
        >
          {(photo, index) => (
            <div key={photo.url}>
              <Image
                className={styles.modalCarouselItem}
                width={photo.width || 500}
                height={photo.height || 375}
                src={photo.url}
                priority={index === 0}
                alt=""
              />
            </div>
          )}
        </AssetCarousel>
      </>
    </ReactModal>
  );
};
