// REPLACE THIS WITH YOUR ACTUAL SERVER URL
// Example: "https://api.quantanova.edu/v1" or "http://localhost:8000/api"
const API_BASE_URL = "http://localhost:8000/api"; 

// Helper to handle response errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }
  return response.json();
};

export const fetchSiteContent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch site content:", error);
    return null; // Return null to trigger fallback/default content
  }
};

export const saveSiteContent = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}` // Add auth token here if needed
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
};

export const uploadFileToStorage = async (file: File, path: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path); // Optional: if your server supports organizing by path

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    // headers: { 'Authorization': ... } 
    body: formData,
  });
  
  const result = await handleResponse(response);
  // Expecting server to return { url: "https://..." }
  return result.url;
};

// Inquiry Endpoints
export const fetchInquiries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return [];
  }
};

export const createInquiry = async (inquiry: any) => {
  const response = await fetch(`${API_BASE_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry),
  });
  const result = await handleResponse(response);
  return result.id; // Expecting server to return the created ID
};

export const updateInquiryStatus = async (id: string, read: boolean) => {
  const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read }),
  });
  return await handleResponse(response);
};
