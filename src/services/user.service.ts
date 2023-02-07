import axiosInstance from '@/services/instance';
import { LOCAL_STORAGE_KEYS } from '@/types/common';
import {
  CreateProductPayload,
  CreateProductResponse,
  EditProductPayload,
  getAllProductsResponse,
  getAllRecipesResponse,
  getOneProductResponse,
} from '@/types/user';

class User {
  private getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  async createProduct(
    payload: CreateProductPayload,
  ): Promise<CreateProductResponse> {
    const { data } = await axiosInstance.post('/users/products', payload, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    return data;
  }

  async editProduct(id: string, payload: EditProductPayload): Promise<void> {
    await axiosInstance.patch(`/users/products/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async removeProduct(id: string): Promise<void> {
    await axiosInstance.delete(`/users/products/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async getAllProducts(): Promise<getAllProductsResponse> {
    const { data } = await axiosInstance.get('/users/products', {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    return data;
  }

  async getOneProduct(id: string): Promise<getOneProductResponse> {
    const { data } = await axiosInstance.get(`/users/products/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    return data;
  }

  async getAllRecipes(): Promise<getAllRecipesResponse> {
    const { data } = await axiosInstance.get('/users/availableRecipes', {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    return data;
  }
}

const UserService = new User();

export default UserService;
