export interface Sentiment {
  pos: number;
  neu: number;
  neg: number;
  compound: number;
}

export interface VideoSentiment {
  vote: string;
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
    'very positive': number;
    positive: number;
    neutral: number;
    negative: number;
    'very negative': number;
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
    processed: VideoSentiment[];
    excluded: VideoSentiment[];
  };
  date: string;
}
