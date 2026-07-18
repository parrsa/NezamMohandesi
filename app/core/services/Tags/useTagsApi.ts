import api from "../../config/api";

export const AllTagListApi = async () => {
  try {
    const response = await api.get("api/Tags");
    return response.data;
  } catch (error) {
    console.error("Failed to get tag list:", error);
    throw error;
  }
};

export const TagByIdApi = async (id: string) => {
  try {
    const response = await api.get(`api/Tags/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get tag by id:", error);
    throw error;
  }
};

export const CreateTagsApi = async (formData: any) => {
  try {
    const response = await api.post("api/Tags", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create a tag:", error);
    throw error;
  }
};

export const UpdateTagsApi = async (id: string, formData: any) => {
  try {
    const response = await api.put(`api/Tags/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to Edit Tag:", error);
    throw error;
  }
};

export const DeleteTagApi = async (id: string) => {
  try {
    const response = await api.delete(`api/Tags/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to delete tags:", error);
    throw error;
  }
};
