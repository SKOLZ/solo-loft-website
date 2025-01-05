"use client";
import { PropertyFragment } from "@/generated/graphql";
import { ASSET_TYPES, AssetType } from "./types";
import React, { useState } from "react";
import Image from "next/image";
import { AssetCarousel } from "./_components/AssetCarousel";
import styles from "./styles.module.scss";
import { getYouTubeVideoId } from "@/utils/getYouTuveVideoId";
import { YoutubeEmbed } from "@/app/_components/YouTubeEmbed";
import ReactModal from "react-modal";

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
  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();
    // event.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.assetViewerContainer}>
      <ReactModal
        isOpen={isModalOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h2>Hello</h2>
        <button onClick={() => setIsModalOpen(false)}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </ReactModal>
      {activeAssetType === ASSET_TYPES.photos && (
        <AssetCarousel
          isSingle={isSinglePhotoAsset({ photos, videos })}
          elements={photos}
        >
          {(photo, index) => (
            <button onClick={openModal}>
              <Image
                className={styles.propertyPhoto}
                key={photo.url}
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
            <button onClick={openModal}>
              <YoutubeEmbed
                width={500}
                height={375}
                className={styles.propertyVideo}
                embedId={getYouTubeVideoId(video.url || "") ?? ""}
              />
            </button>
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
