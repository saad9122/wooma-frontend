import { apiClient } from '../client';


export const authApi = {
  logout: async (): Promise<void> => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
},
};