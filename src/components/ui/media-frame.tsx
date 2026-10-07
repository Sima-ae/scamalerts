import Image from "next/image";

type MediaFrameProps = {
  src?: string;
  alt?: string;
  /** Optional future video URL — when set, renders a muted looping video */
  videoSrc?: string;
  poster?: string;
  className?: string;
  priority?: boolean;
  overlay?: "ink" | "soft" | "none";
};

/**
 * Full-bleed media plane for photos now, video later.
 * Prefer edge-to-edge usage in hero/section backgrounds.
 */
export function MediaFrame({
  src,
  alt = "",
  videoSrc,
  poster,
  className = "",
  priority = false,
  overlay = "ink",
}: MediaFrameProps) {
  const overlayClass =
    overlay === "ink"
      ? "bg-[linear-gradient(105deg,rgba(15,28,46,0.82)_0%,rgba(15,28,46,0.45)_48%,rgba(194,65,12,0.28)_100%)]"
      : overlay === "soft"
        ? "bg-[linear-gradient(180deg,rgba(15,28,46,0.12)_0%,rgba(15,28,46,0.35)_100%)]"
        : "";

  return (
    <div className={`media-frame absolute inset-0 overflow-hidden ${className}`}>
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster || src}
          aria-hidden={alt ? undefined : true}
        >
          <source src={videoSrc} />
        </video>
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
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
