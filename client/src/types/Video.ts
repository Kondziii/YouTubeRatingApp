export interface Video {
  id: string;
  channelId: string;
  channelTitle: string;
  title: string;
  publishedAt: string;
  image: string;
  statistics?: {
    viewCount: number;
    favoriteCount: number;
    commentCount: number;
  };
}
