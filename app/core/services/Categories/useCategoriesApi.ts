import { ParamValue } from "next/dist/server/request/params";
import api from "../../config/api";

export const AllCategoriesListApi = async (
  PageNumber: number = 1,
  PageSize: number = 20,
) => {
  try {
    const response = await api.get(
      `api/Categories?page=${PageNumber}&pageSize=${PageSize}}&sortBy=Name&sortDescending=false`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories list:", error);
    throw error;
  }
};

export const GetCategoryByIdApi = async (id: string) => {
  try {
    const response = await api.get(`api/Categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get category by Id:", error);
    throw error;
  }
};

export const GetSubCategoryApi = async (id: string | ParamValue) => {
  try {
    const response = await api.get(`api/Categories/${id}/sub?onlyActive=true`);
    return response.data;
  } catch (error) {
    console.error("Failed to get sub categories:", error);
    throw error;
  }
};

export const GetSubCategoriesApi = async (id: string) => {
  try {
    const response = await api.get(`api/Categories/${id}/sub`);
    return response.data;
  } catch (error) {
    console.error("Failed to get sub categories:", error);
    throw error;
  }
};

export const GetCategoriesTreeApi = async (
  PageNumber: number = 1,
  PageSize: number = 20,
) => {
  try {
    const response = await api.get(`api/Categories/tree`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateCategoriesApi = async (formData: any) => {
  try {
    const response = await api.post("/CreateCategory", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create categories:", error);
    throw error;
  }
};

export const UpdateCategoriesApi = async (id: string, formData: any) => {
  try {
    const response = await api.put(`api/Categories/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update categories:", error);
    throw error;
  }
};

export const DeleteCategories = async (id: string) => {
  try {
    const response = await api.delete(`api/Categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete categories:", error);
    throw error;
  }
};
