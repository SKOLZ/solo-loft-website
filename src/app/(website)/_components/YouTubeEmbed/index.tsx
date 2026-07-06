import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "@/styles/overrides/react-lite-youtube-embed.scss";

type YoutubeEmbedProps = {
  embedId: string;
  width: number;
  height: number;
  className?: string;
};

export const YoutubeEmbed = ({
  embedId,
  width,
  height,
  className,
}: YoutubeEmbedProps) => (
  <div className={className}>
    <LiteYouTubeEmbed
      id={embedId}
      title="Embedded youtube"
      aspectWidth={4}
      aspectHeight={3}
    />
  </div>
);
