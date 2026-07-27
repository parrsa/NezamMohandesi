import { ParamValue } from "next/dist/server/request/params";
import api from "../../config/api";

export const AllContentsListApi = async (
  PageNumber: number = 1,
  PageSize: number = 20,
  isActive: boolean | null,
  categoryId: ParamValue | string | null,
) => {
  try {
    const response = await api.get(
      `api/Contents?categoryId=${categoryId}&page=${PageNumber}&pageSize=${PageSize}&sortBy=CreatedAt&sortDescending=true`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get contents:", error);
    throw error;
  }
};

export const ContentByIdApi = async (id: string | null) => {
  try {
    const response = await api.get(`api/Contents/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get content by id:", error);
    throw error;
  }
};

export const CreateContentApi = async (formData: FormData) => {
  try {
    const response = await api.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create content:", error);
    throw error;
  }
};

export const EditContentApi = async (id: string, formData: FormData) => {
  try {
    const response = await api.put(`api/Contents/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to update content:", error);
    throw error;
  }
};

export const DeleteContentApi = async (id: string) => {
  try {
    const response = await api.delete(`api/Contents/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete content:", error);
    throw error;
  }
};

export const ViewContentApi = async (id: string) => {
  if (id) {
    try {
      const response = await api.post(`api/Contents/${id}/view`);
      return response.data.success;
    } catch (error) {
      console.error("Failed to view content:", error);
      throw error;
    }
  }
};
