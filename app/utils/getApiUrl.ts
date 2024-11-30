export const getApiUrl = () => {
    const apiUrl = process.env.API_URL;
  
    if (!apiUrl) {
      throw new Error("API_URL is not defined in the environment variables");
    }
  
    return apiUrl;
  };
  