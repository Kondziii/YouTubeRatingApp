export interface Sentiment {
  vote: string;
  videoId?: string;
  publishedAt?: string;
  title?: string;
  imageHigh?: string;
  commentCount: {
    all: number;
    processed: number;
    excluded: number;
  };
  commentVoteCount: {
    positive: number;
    neutral: number;
    negative: number;
  };
  avg: {
    positive: number;
    neutral: number;
    negative: number;
    compound?: number;
  };
  evaluateParams: {
    useSubcomments: boolean;
    useAuthorAnswers: boolean;
  };
  date: string;
}

export interface ChannelSentiment {
  vote: string;
  videosCount: {
    all: number;
    processed: number;
    excluded: number;
  };
  videosVoteCount: {
    positive: number;
    neutral: number;
    negative: number;
  };
  videosAvg: {
    positive: number;
    neutral: number;
    negative: number;
    compound: number;
  };
  evaluateParams: {
    commentsLimit: number;
    useTime: boolean;
    beginDate: string;
    endDate: string;
    useSubcomments: boolean;
    useAuthorAnswers: boolean;
  };
  videosSentiment: {
    processed: Sentiment[];
    excluded: Sentiment[];
  };
  date: string;
}
