import axiosInstance from '@/services/instance';
import { LOCAL_STORAGE_KEYS } from '@/types/common';
import {
  CreateIngredientPayload,
  CreateIngredientResponse,
  EditIngredientPayload,
  GetAllQuery,
  GetAllResponse,
  GetOneQuery,
  GetOneResponse,
} from '@/types/ingredients';

class Ingredients {
  private getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  async getAll(query?: GetAllQuery): Promise<GetAllResponse> {
    const { data } = await axiosInstance.get<GetAllResponse>('/ingredients', {
      params: query,
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    return data;
  }

  async getOne(id: string, query?: GetOneQuery): Promise<GetOneResponse> {
    const { data } = await axiosInstance.get<GetOneResponse>(
      `/ingredients/${id}`,
      {
        params: query,
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      },
    );
    return data;
  }

  async create(
    payload: CreateIngredientPayload,
  ): Promise<CreateIngredientResponse> {
    const { data } = await axiosInstance.post<CreateIngredientResponse>(
      '/ingredients',
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      },
    );
    return data;
  }

  async edit(id: string, payload: EditIngredientPayload): Promise<void> {
    await axiosInstance.patch(`/ingredients/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/ingredients/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}

const IngredientsService = new Ingredients();

export default IngredientsService;
