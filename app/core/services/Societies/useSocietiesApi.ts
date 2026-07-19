import api from "../../config/api";

export const AllSocietiesListApi = async () => {
  try {
    const response = await api.get("api/Societies/GetAll");
    return response.data;
  } catch (error) {
    console.error("Failed to get Societies list:", error);
    throw error;
  }
};

export const GetSocietiesByIdApi = async (id: string) => {
  try {
    const response = await api.get(`api/Societies/GetById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get Societies by Id:", error);
    throw error;
  }
};

export const CreateSocietiesApi = async (formData: any) => {
  try {
    const response = await api.post("api/Societies/Create", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create Societies:", error);
    throw error;
  }
};

export const EditSocietiesApi = async (id: string, formData: any) => {
  try {
    const response = await api.put(`api/Societies/Update/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to update Societies:", error);
    throw error;
  }
};

export const DeleteSocietiesApi = async (id: string) => {
  try {
    const response = await api.delete(`api/Societies/Delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete Societies:", error);
    throw error;
  }
};
