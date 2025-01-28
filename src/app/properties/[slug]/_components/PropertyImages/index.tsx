"use client";

import { Carousel } from "@/app/_components/Carousel";
import { PropertyFragment } from "@/generated/graphql";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from "react";
import ReactModal from "react-modal";

interface Props {
  photos: PropertyFragment["photos"];
}

export const PropertyImages: React.FC<Props> = ({ photos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  switch (photos.length) {
    case 0:
      return null;
    case 1:
      return (
        <>
          <ReactModal
            isOpen={isModalOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
          />
          <button onClick={openModal}>
            <Image
              className={styles.propertyPhoto}
              width={500}
              height={375}
              src={photos[0].url}
              alt=""
            />
          </button>
        </>
      );
    default:
      return (
        <>
          <ReactModal
            isOpen={isModalOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
          />
          <Carousel
            settings={{ arrows: true }}
            className={styles.propertyPhoto}
          >
            {photos.map((photo) => (
              <button key={photo.url} onClick={openModal}>
                <Image
                  className={styles.propertyPhoto}
                  key={photo.url}
                  width={500}
                  height={375}
                  src={photo.url}
                  alt=""
                />
              </button>
            ))}
          </Carousel>
        </>
      );
  }
};
