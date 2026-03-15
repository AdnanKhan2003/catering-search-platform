import { ApiResponse, Caterer } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getCaterers(): Promise<Caterer[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/caterers`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch caterers: ${response.statusText}`);
    }
    
    const result: ApiResponse<Caterer[]> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching caterers:", error);
    return [];
  }
}

export async function getCatererById(id: string): Promise<Caterer | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/caterers/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch caterer ${id}: ${response.statusText}`);
    }
    
    const result: ApiResponse<Caterer> = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching caterer ${id}:`, error);
    return null;
  }
}

export async function createCaterer(caterer: Omit<Caterer, "_id">): Promise<Caterer | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/caterers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caterer),
    });

    if (!response.ok) {
      throw new Error(`Failed to create caterer: ${response.statusText}`);
    }

    const result: ApiResponse<Caterer> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error creating caterer:", error);
    return null;
  }
}
