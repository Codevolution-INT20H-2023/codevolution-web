import { MeasureType } from '@/types/ingredients';

export const MeasureOptions = Object.entries(MeasureType).map(
  ([key, value]) => ({ label: key, value }),
);
