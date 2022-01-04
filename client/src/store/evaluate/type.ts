import { VideoHistory } from '@/types/Video';
import { EvaluateParams } from './../../types/EvaluateParams';
import { Sentiment, ChannelSentiment } from './../../types/Sentiment';

export interface EvaluateState {
  params: EvaluateParams | null;
  videoResult: Sentiment | null;
  videoHistory: VideoHistory[] | [];
  channelResult: ChannelSentiment | null;
  isChannelResultVisible: boolean;
}
