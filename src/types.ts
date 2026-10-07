export type MediaCategory =
  | 'ALL'
  | 'EARLY_MEMORIES'
  | 'MOM_AND_ME'
  | 'PORTRAIT'
  | 'BIRTHDAY'
  | 'TRAVEL'
  | 'MOVIE_TIME'
  | 'CANDID'
  | 'VIDEOS'
  | 'GENERAL_MEMORIES';

export interface MediaAsset {
  id: string;
  file: string;
  title: string;
  type: 'image' | 'video' | 'audio';
  category: MediaCategory;
  orientation: 'landscape' | 'portrait' | 'square';
  focalX: string;
  focalY: string;
  heroSuitability: boolean;
  caption?: string;
  dateEstimate?: string;
  archiveCode: string;
  duration?: string;
  tagline?: string;
}

export interface Episode {
  id: string;
  epNumber: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnailAssetId: string;
  progressPercent: number;
  duration: string;
  category: MediaCategory;
  locked?: boolean;
  lockReason?: string;
}

export interface Profile {
  id: string;
  name: string;
  subtitle: string;
  avatarAssetId: string;
  accent: string;
  role: 'yamini' | 'aarran' | 'both' | 'archive';
}
