export interface Channel {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  statistics?: {
    viewCount: number;
    subscriberCount: number;
    hiddenSubscriberCount: number;
    videoCount: number;
  };
  uploads: string;
}
