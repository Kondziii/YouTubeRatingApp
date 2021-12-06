import Evaluate from '@/types/Evaluate';

export interface EvaluateState {
  params: {
    type: Evaluate;
    minComments: number;
    useDates: boolean;
    beginDate: string | null;
    endDate: string | null;
    useSubComments: boolean;
    useAuthorAnswers: boolean;
  };
}
