import { ParamValue } from "next/dist/server/request/params";
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

export const CreateSocietyNoticesApi = async (formData: FormData) => {
  try {
    const response = await api.post("api/SocietyNotices/Create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to create Society Notices:", error);
    throw error;
  }
};

export const GetAllSocietyNoticesApi = async (id: ParamValue) => {
  try {
    const response = await api.get(`api/SocietyNotices/GetAll?societyId=${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get Society Notices:", error);
    throw error;
  }
};

export const GetSocietyNoticesByIdApi = async (id: ParamValue) => {
  try {
    const response = await api.get(`api/SocietyNotices/GetById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get Society Notices:", error);
    throw error;
  }
};

export const GetSocietyByIdApi = async (id: ParamValue) => {
  try {
    const response = await api.get(`api/Societies/GetById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get Society Notices:", error);
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

export const DeleteSocietiesNoticesApi = async (id: string) => {
  try {
    const response = await api.delete(`api/SocietyNotices/Delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete Societies:", error);
    throw error;
  }
};
