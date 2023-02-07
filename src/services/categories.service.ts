import axiosInstance from '@/services/instance';
import {
  CategoryType,
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

  async getAll(
    type: CategoryType,
    query?: GetAllQuery,
  ): Promise<GetAllResponse> {
    const { data } = await axiosInstance.get<GetAllResponse>(
      `/${type}Categories`,
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
    type: CategoryType,
    payload: CreateCategoryPayload,
  ): Promise<CreateCategoryResponse> {
    const { data } = await axiosInstance.post<CreateCategoryResponse>(
      `/${type}Categories`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      },
    );
    return data;
  }

  async edit(
    id: string,
    type: CategoryType,
    payload: EditCategoryPayload,
  ): Promise<void> {
    await axiosInstance.patch(`/${type}Categories/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async remove(id: string, type: CategoryType): Promise<void> {
    await axiosInstance.delete(`/${type}Categories/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}

const CategoriesService = new Categories();

export default CategoriesService;
