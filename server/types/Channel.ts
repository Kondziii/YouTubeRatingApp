export interface ChannelBySearch {
  kind: string;
  etag: string;
  id: {
    kind: string;
    channelId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface ChannelById {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
  statistics?: {
    viewCount: number;
    subscriberCount: number;
    hiddenSubscriberCount: number;
    videoCount: number;
  };
  contentDetails?: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
}
export interface Channel {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  imageHigh: string;
  statistics?: {
    viewCount: number;
    subscriberCount: number;
    hiddenSubscriberCount: number;
    videoCount: number;
  };
  uploads: string;
}
