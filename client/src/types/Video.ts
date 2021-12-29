import { Sentiment } from './Sentiment';
export interface Video {
  id: string;
  channelId: string;
  channelTitle: string;
  title: string;
  publishedAt: string;
  image: string;
  imageHigh: string;
  statistics?: {
    viewCount: number;
    favoriteCount: number;
    commentCount: number;
  };
}

export interface VideoHistory {
  id: string;
  video: Video;
  result: Sentiment;
}
