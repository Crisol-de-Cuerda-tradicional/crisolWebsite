import type { IframeHTMLAttributes } from "react";

interface SpotifyProps {
  artistId: string;
  wide?: boolean;
  width?: number | string;
  height?: number | string;
  frameBorder?: number | string;
  allow?: string;
}

export const Spotify = ({
  artistId,
  style = {},
  wide = false,
  width = wide ? undefined : 360,
  height = 380,
  loading = "lazy",
  allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  ...props
}: SpotifyProps & IframeHTMLAttributes<HTMLIFrameElement>) => {
  return (
    <iframe
      title="Spotify Player"
      src={`https://open.spotify.com/embed/artist/${artistId}`}
      allow={allow}
      loading={loading}
      style={{
        borderRadius: "12px",
        border: "none",
        minWidth: "360px",
        flexGrow: wide ? 1 : 0,
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    />
  );
};
