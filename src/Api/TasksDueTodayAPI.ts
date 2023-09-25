const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Tasks Due Today ----------
export const fetchTasksDueToday = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/due-today`);
    if (!res.ok) {
      throw new Error(`API response status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks due today:", error);
    throw error;
  }
};
