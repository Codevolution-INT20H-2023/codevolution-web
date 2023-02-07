import axiosInstance from '@/services/instance';
import { LOCAL_STORAGE_KEYS } from '@/types/common';
import {
  CreateRecipePayload,
  CreateRecipeResponse,
  EditRecipePayload,
  GetAllResponse,
  GetOneResponse,
} from '@/types/recipes';

class Recipes {
  private getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  async getAll(): Promise<GetAllResponse> {
    const { data } = await axiosInstance.get<GetAllResponse>('/recipes', {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: { products: true },
    });
    return data;
  }

  async getOne(id: string): Promise<GetOneResponse> {
    const { data } = await axiosInstance.get<GetOneResponse>(`/recipes/${id}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: { products: true },
    });
    return data;
  }

  async create(payload: CreateRecipePayload): Promise<CreateRecipeResponse> {
    const { data } = await axiosInstance.post<CreateRecipeResponse>(
      `/recipes`,
      payload,
      { headers: { Authorization: `Bearer ${this.getToken()}` } },
    );
    return data;
  }

  async edit(id: string, payload: EditRecipePayload): Promise<void> {
    await axiosInstance.patch(`/recipes/${id}`, payload, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/recipes/${id}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }
}

const RecipesService = new Recipes();

export default RecipesService;
