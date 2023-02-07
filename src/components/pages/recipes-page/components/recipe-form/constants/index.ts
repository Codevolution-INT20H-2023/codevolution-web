import { MeasureType } from '@/types/common';

export const MeasureOptions = Object.entries(MeasureType).map(
  ([key, value]) => ({ label: key, value }),
);
