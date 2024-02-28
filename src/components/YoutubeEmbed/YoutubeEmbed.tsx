import { IframeHTMLAttributes } from "react";

interface IYoutubeEmbedProps {
  embedId: string;
  title?: string;
  wide?: boolean;
}

export const YoutubeEmbed = ({
  embedId,
  title = "Youtube video",
  wide,
  style = {},
  height = "360",
  width = wide ? undefined : 600,
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
  allowFullScreen = true,
}: IYoutubeEmbedProps & IframeHTMLAttributes<HTMLIFrameElement>) => {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      title={title}
      height={height}
      style={{
        border: 0,
        width,
        minWidth: "360px",
        flexGrow: wide ? 1 : 0,
        ...style,
      }}
      allow={allow}
      allowFullScreen={allowFullScreen}
    />
  );
};
