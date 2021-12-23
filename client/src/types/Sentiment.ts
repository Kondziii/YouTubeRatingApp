export interface Sentiment {
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
    compound: number;
  };
}
