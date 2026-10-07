/**
 * Section media. Set `video` to a muted MP4/WebM in /public/media to replace
 * the photo with a looping background video; the photo stays as poster.
 */
export type SectionMedia = {
  image: string;
  video?: string;
};

export const MEDIA = {
  hero: { image: "/media/hero-trust.jpg" },
  signals: { image: "/media/section-signal.jpg" },
  community: { image: "/media/community-phone.jpg" },
  knowledge: { image: "/media/knowledge-desk.jpg" },
  business: { image: "/media/business-office.jpg" },
} satisfies Record<string, SectionMedia>;
