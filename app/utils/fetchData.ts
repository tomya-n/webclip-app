import { getApiUrl } from "./getApiUrl";

export const fetchData = async (endpoint:any, options = {}) => {
  const url = `${getApiUrl()}${endpoint}`;
  try {
    const response = await fetch(url, { ...options });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
