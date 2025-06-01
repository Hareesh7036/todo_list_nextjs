import { TaskResult } from "./schema";

export const fetchTasks = async (searchText: string): Promise<TaskResult[]> => {
  const query = searchText ? `?search=${encodeURIComponent(searchText)}` : "";
  const response = await fetch(`/api/task${query}`, {
    method: "Get",
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) {
      // User is not authenticated
      throw new Error("Unauthorized");
    }
    throw new Error("Fetching tasks failed!");
  }
  return await response.json();
};
