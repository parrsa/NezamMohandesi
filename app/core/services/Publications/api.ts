import api from "../../config/api";

export const getAllPublicationsList = async ({
  PageNumber = 0,
  PageSize = 10,
}) => {
  try {
    const response = await api.get(
      `Publication/GetPublicationList?PageNumber=${PageNumber}&PageSize=${PageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch get all publications", error);
    throw error;
  }
};

export const getPublicationById = async (id: string) => {
  try {
    const response = await api.get(`Publication/GetPublicationById?publicationId=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch publication with id ${id}:`, error);
    throw error;
  }
};

export const CreatePublicationFn = async (
  formData: unknown
): Promise<unknown> => {
  try {
    const response = await api.post(`Publication/AddPublication`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw error;
  }
};

export const UpdatePublicationFn = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<unknown> => {
  try {
    const response = await api.put(
      `Publication/EditPublication`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update publication with id ${id}:`, error);
    throw error;
  }
};

export const DeletePublicationFn = async (formData:any): Promise<unknown> => {
  try {
    const response = await api.delete(`Publication/DeletePublication`, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete publication:`, error);
    throw error;
  }
};