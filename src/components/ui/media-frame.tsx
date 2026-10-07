import Image from "next/image";
import type { SectionMedia } from "@/lib/media";

type MediaFrameProps = {
  media?: SectionMedia;
  src?: string;
  alt?: string;
  videoSrc?: string;
  poster?: string;
  className?: string;
  priority?: boolean;
  overlay?: "ink" | "soft" | "none";
  pan?: boolean;
  sizes?: string;
};

/** Absolute media plane: photo now, muted looping video when `video` is set. */
export function MediaFrame({
  media,
  src,
  alt = "",
  videoSrc,
  poster,
  className = "",
  priority = false,
  overlay = "ink",
  pan = true,
  sizes = "100vw",
}: MediaFrameProps) {
  const image = src ?? media?.image;
  const video = videoSrc ?? media?.video;
  const overlayClass =
    overlay === "ink"
      ? "bg-[linear-gradient(105deg,rgba(15,28,46,0.84)_0%,rgba(15,28,46,0.5)_48%,rgba(194,65,12,0.3)_100%)]"
      : overlay === "soft"
        ? "bg-[linear-gradient(180deg,rgba(15,28,46,0.05)_0%,rgba(15,28,46,0.3)_100%)]"
        : "";

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${pan ? "media-frame" : ""} ${className}`}
    >
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster ?? image}
          aria-hidden={alt ? undefined : true}
        >
          <source src={video} />
        </video>
      ) : image ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#1a334f_0%,#0f1c2e_55%,#3b1d12_100%)]" />
      )}
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass}`} aria-hidden />
      )}
    </div>
  );
}
