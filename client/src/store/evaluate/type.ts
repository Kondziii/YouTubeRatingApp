import { EvaluateParams } from './../../types/EvaluateParams';
import { Sentiment } from './../../types/Sentiment';

export interface EvaluateState {
  params: EvaluateParams | null;
  result: Sentiment | null;
}
