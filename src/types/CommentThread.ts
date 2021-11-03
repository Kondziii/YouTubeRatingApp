type CommentThread = {
  etag: string;
  id: string;
  kind: string;
  replies: {
    comments: Array<{
      etag: string;
      id: string;
      kind: string;
      snippet: {
        authorChannelId: {
          value: string;
        };
        authorChannelUrl: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        canRate: true;
        likeCount: number;
        parentId: string;
        publishedAt: Date;
        textDisplay: string;
        textOriginal: string;
        updatedAt: Date;
        videoId: string;
        viewerRating: string;
      };
    }>;
  };
};

export default CommentThread;
