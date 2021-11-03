type ChannelBasic = {
  etag: string;
  id: {
    channelID: string;
    kind: string;
  };
  kind: string;
  snippet: {
    channelID?: string;
    channelTitle?: string;
    description: string;
    liveBroadcastContent?: string;
    publishTime?: Date;
    publishedAt: Date;
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
    title: string;
    country?: string;
    customUrl?: string;
    localized?: unknown;
  };
};

type ChannelStatistics = {
  hiddenSubscriberCount: boolean;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
};

type ChannelContentDetails = {
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
};

type ChannelWithStats = ChannelBasic & ChannelStatistics;

type ChannelFullInfo = ChannelWithStats & ChannelContentDetails;

export { ChannelBasic, ChannelWithStats, ChannelFullInfo };
