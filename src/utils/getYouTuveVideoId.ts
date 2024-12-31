export const getYouTubeVideoId = (url: string) => {
  const youtubeUrlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[\?&][^\s]*)?$/;
  const match = url.match(youtubeUrlRegex);
  return match ? match[1] : null; // Returns the video ID if matched, otherwise null
};
