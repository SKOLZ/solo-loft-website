"use client";
import { PropertyFragment } from "@/generated/graphql";
import { ASSET_TYPES, AssetType } from "./types";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { AssetCarousel } from "./_components/AssetCarousel";
import styles from "./styles.module.scss";
import { getYouTubeVideoId } from "@/utils/getYouTuveVideoId";
import { YoutubeEmbed } from "@/app/_components/YouTubeEmbed";
import ReactModal from "react-modal";
import "@/styles/overrides/react-modal.scss";
import Slider from "react-slick";

ReactModal.setAppElement("#root");

type NonEmptyArray<T> = [T, ...T[]];

type PhotoAssetProps = {
  photos: NonEmptyArray<PropertyFragment["photos"][number]>;
  videos: PropertyFragment["videos"];
};
type VideoAssetProps = {
  photos: PropertyFragment["photos"];
  videos: NonEmptyArray<PropertyFragment["videos"][number]>;
};

function isSinglePhotoAsset(assetProps: Props): assetProps is PhotoAssetProps {
  return assetProps.photos.length === 1;
}

function isSingleVideoAsset(assetProps: Props): assetProps is VideoAssetProps {
  return assetProps.videos.length === 1;
}

interface Props {
  photos: PropertyFragment["photos"];
  videos: PropertyFragment["videos"];
}

export const PropertyAssetsViewer: React.FC<Props> = ({ photos, videos }) => {
  const [activeAssetType, setActiveAssetType] = useState<AssetType>(
    ASSET_TYPES.photos
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const modalSliderRef = useRef<Slider>(null);
  const sliderRef = useRef<Slider>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    sliderRef.current?.slickGoTo(currentPhotoIndex, true);
    setIsModalOpen(false);
  };

  const onSlideChange = (_: number, index: number) => {
    setCurrentPhotoIndex(index);
  };

  const onInitModalCarousel = () => {
    modalSliderRef.current?.slickGoTo(currentPhotoIndex, true);
  };

  return (
    <div className={styles.assetViewerContainer}>
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
            isSingle={isSinglePhotoAsset({ photos, videos })}
            elements={photos}
            className={styles.modalCarousel}
            arrowClassName={styles.modalCarouselArrow}
            arrowVariant="full"
            sliderRef={modalSliderRef}
            settings={{
              onInit: onInitModalCarousel,
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
      {activeAssetType === ASSET_TYPES.photos && (
        <AssetCarousel
          isSingle={isSinglePhotoAsset({ photos, videos })}
          elements={photos}
          className={styles.propertyPhotos}
          sliderRef={sliderRef}
          settings={{
            beforeChange: onSlideChange,
          }}
        >
          {(photo, index) => (
            <button
              onClick={openModal}
              key={photo.url}
              className={styles.propertyPhotoWrapper}
            >
              <Image
                className={styles.propertyPhoto}
                width={500}
                height={375}
                src={photo.url}
                priority={index === 0}
                alt=""
              />
            </button>
          )}
        </AssetCarousel>
      )}
      {activeAssetType === ASSET_TYPES.videos && (
        <AssetCarousel
          isSingle={isSingleVideoAsset({ photos, videos })}
          elements={videos}
        >
          {(video) => (
            <YoutubeEmbed
              width={500}
              height={375}
              className={styles.propertyVideo}
              embedId={getYouTubeVideoId(video.url || "") ?? ""}
            />
          )}
        </AssetCarousel>
      )}
      {!!photos.length && !!videos.length && (
        <>
          <button
            className={`${styles.assetViewerTypeSwitcher} ${styles.photos}`}
            onClick={() => setActiveAssetType(ASSET_TYPES.photos)}
          >
            <i className="ic ic-photo" />
          </button>
          <button
            className={`${styles.assetViewerTypeSwitcher} ${styles.videos}`}
            onClick={() => setActiveAssetType(ASSET_TYPES.videos)}
          >
            <i className="ic ic-video" />
          </button>
        </>
      )}
    </div>
  );
};
