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
import { AssetModal } from "./_components/AssetModal";

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
    modalSliderRef.current?.slickGoTo(currentPhotoIndex, true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    sliderRef.current?.slickGoTo(currentPhotoIndex, true);
    setIsModalOpen(false);
  };

  const onSlideChange = (_: number, index: number) => {
    setCurrentPhotoIndex(index);
  };

  const onSetPhotosAsActive = () => {
    setActiveAssetType(ASSET_TYPES.photos);
    sliderRef.current?.slickGoTo(currentPhotoIndex, true);
  };

  return (
    <div className={styles.assetViewerContainer}>
      <AssetModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        photos={photos}
        modalSliderRef={modalSliderRef}
        initialSlide={currentPhotoIndex}
        onSlideChange={onSlideChange}
      />
      {activeAssetType === ASSET_TYPES.photos && (
        <AssetCarousel
          isSingle={photos.length === 1}
          elements={photos}
          className={styles.propertyPhotos}
          sliderRef={sliderRef}
          settings={{
            initialSlide: currentPhotoIndex,
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
        <AssetCarousel isSingle={videos.length === 1} elements={videos}>
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
            onClick={onSetPhotosAsActive}
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
