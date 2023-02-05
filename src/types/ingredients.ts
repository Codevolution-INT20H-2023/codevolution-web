enum MeasureType {
  KILOGRAMMS,
  LITERS,
  GRAMMS,
  MILLILITERS,
  PIECES,
  BUNCH,
  TABLE_SPOON,
  TEA_SPOON,
  CUP,
  PINCH,
  CLOVE,
}

export interface Measure {
  measure: MeasureType;
  toStandard: number;
}

export interface Ingredient {
  id: string;
  name: string;
  standard: MeasureType;
  category: {
    id: string;
    name: string;
  };
  measures?: Measure[];
}

export interface GetAllQuery {
  search?: string;
  measures?: boolean;
  category?: boolean;
}

export interface GetAllResponse {
  ingredients: Ingredient[];
}

export interface GetOneQuery {
  measures?: boolean;
  category?: boolean;
}

export type GetOneResponse = Ingredient;

export interface CreateIngredientPayload {
  name: string;
  standard: MeasureType;
  categoryId: string;
  measures?: Measure[];
}

export type CreateIngredientResponse = Ingredient;

export interface EditIngredientPayload {
  name?: string;
  standard?: MeasureType;
  categoryId?: string;
}
