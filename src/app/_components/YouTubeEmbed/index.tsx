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
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${embedId}?modestbranding=1&showinfo=0&rel=0`}
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
