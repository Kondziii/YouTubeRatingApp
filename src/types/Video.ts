type Video = {
  etag: string;
  id:
    | string
    | {
        kind: string;
        videoId: string;
      };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent?: string;
    publishTime?: Date;
    playlistId?: string;
    position?: number;
    publishedAt: Date;
    resourceId?: {
      kind: string;
      videoId: string;
    };
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      maxres?: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
      standard?: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
    videoOwnerChannelId?: string;
    videoOwnerChannelTitle?: string;
  };
};

type VideoStatistics = {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;
};

type VideoFullInfo = Video & VideoStatistics;

export default Video;

export { VideoFullInfo };
