import { Post } from "../types";
import axiosInstance from "./axiosInstance";

export const postsService = {
  getAll: async (): Promise<Post[]> => {
    const response = await axiosInstance.get<Post[]>("/posts?_limit=10");
    return response.data;
  },
  getById: async (id: string): Promise<Post[]> => {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  },

  create: async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await axiosInstance.post<Post>("/posts", post);
    return response.data;
  },

  update: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await axiosInstance.put<Post>(`/posts/${id}`, post);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/posts/${id}`);
  },
};
