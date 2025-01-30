import { apiRequest } from "@/utils/api";

export async function search({ query }: { query: string }) {
  const res = await apiRequest(`/home/search?searchTerm=${encodeURIComponent(query)}&page=0&size=10`);
  
  return res.content; // Retorna apenas os posts dentro de "content"
}
