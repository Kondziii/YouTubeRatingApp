export interface CommentThreadItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    parentId: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
  };
}

export interface CommentThread {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    topLevelComment: CommentThreadItem;
  };
  replies?: {
    comments: Array<CommentThreadItem>;
  };
}

export interface Comment {
  text: string;
  authorId: string;
}
