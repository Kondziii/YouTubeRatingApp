import Evaluate from './Evaluate';

export interface EvaluateParams {
  type: Evaluate;
  minComments: number;
  useDates: boolean;
  beginDate: string | null;
  endDate: string | null;
  useSubComments: boolean;
  useAuthorAnswers: boolean;
}
