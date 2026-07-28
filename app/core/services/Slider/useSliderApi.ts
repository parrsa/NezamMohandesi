import api from "../../config/api";

export const GetAllSliderApi = async () => {
  try {
    const response = await api.get(`api/Sliders?position=0`);
    return response.data;
  } catch (error) {
    console.error("Failed to get slider images:", error);
    throw error;
  }
};

export const CreateSliderApi = async (formData: FormData) => {
  try {
    const response = await api.post("api/Sliders", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create sliders:", error);
    throw error;
  }
};

export const DeleteSliderApi = async (id: string) => {
  try {
    const response = await api.delete(`api/Sliders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete sliders:", error);
    throw error;
  }
};
