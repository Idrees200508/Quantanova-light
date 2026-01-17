
const STORAGE_KEY = 'quantanova_content';
const INQUIRIES_KEY = 'quantanova_inquiries';
const SERVER_DATA_PATH = './site-data.json'; 

/**
 * Fetches site content.
 * Prioritizes the site-data.json file (which you upload via FTP).
 * This allows the site to be "live" without a backend database.
 */
export const fetchSiteContent = async () => {
  try {
    // We add a unique timestamp to bypass browser cache
    const response = await fetch(`${SERVER_DATA_PATH}?nocache=${Date.now()}`);
    if (response.ok) {
      const serverData = await response.json();
      console.log("Production data synced from FTP server.");
      
      // We save to localStorage so the Admin Dashboard starts with the live data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
      return serverData;
    }
  } catch (e) {
    console.warn("No site-data.json found on server. Using local storage.");
  }

  const localData = localStorage.getItem(STORAGE_KEY);
  return localData ? JSON.parse(localData) : null;
};

export const saveSiteContent = async (data: any) => {
  const currentData = localStorage.getItem(STORAGE_KEY);
  const current = currentData ? JSON.parse(currentData) : {};
  const merged = { ...current, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
};

export const importBulkData = async (fullData: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
};

export const fetchInquiries = async () => {
  const data = localStorage.getItem(INQUIRIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const updateInquiryStatus = async (id: string, read: boolean) => {
  const inquiries = await fetchInquiries();
  const updated = inquiries.map((i: any) => i.id === id ? { ...i, read } : i);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
};

export const removeInquiry = async (id: string) => {
  const inquiries = await fetchInquiries();
  const updated = inquiries.filter((i: any) => i.id !== id);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
};

export const uploadFileToStorage = async (file: File, path: string): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};
