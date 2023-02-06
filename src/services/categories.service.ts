import axiosInstance from '@/services/instance';
import {
  CreateCategoryPayload,
  CreateCategoryResponse,
  EditCategoryPayload,
  GetAllQuery,
  GetAllResponse,
} from '@/types/categories';
import { LOCAL_STORAGE_KEYS } from '@/types/common';

class Categories {
  private getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  async getAll(query?: GetAllQuery): Promise<GetAllResponse> {
    const { data } = await axiosInstance.get<GetAllResponse>(
      '/ingredientCategories',
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
    payload: CreateCategoryPayload,
  ): Promise<CreateCategoryResponse> {
    const { data } = await axiosInstance.post<CreateCategoryResponse>(
      '/ingredientCategories',
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      },
    );
    return data;
  }

  async edit(id: string, payload: EditCategoryPayload): Promise<void> {
    await axiosInstance.patch(`/ingredientCategories/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/ingredientCategories/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}

const CategoriesService = new Categories();

export default CategoriesService;
