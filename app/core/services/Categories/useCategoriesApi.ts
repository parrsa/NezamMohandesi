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
    const response = await api.get(`Categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get category by Id:", error);
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

export const UpdateCategoriesApi = async (id: string, formData: FormData) => {
  try {
    const response = await api.put(`Categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
