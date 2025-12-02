export interface Breed {
  id: string;
  name: string;
  description?: string;
  characteristics?: string;
  averageSize?: string;
  temperament?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'https://pup-server.vercel.app' : 'http://localhost:4000');

export const breedsApi = {
  async getAll(): Promise<Breed[]> {
    const response = await fetch(`${API_BASE_URL}/api/breeds`);
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    return response.json();
  },

  async getById(id: string): Promise<Breed | null> {
    const response = await fetch(`${API_BASE_URL}/api/breeds/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch breed');
    }
    return response.json();
  }
};

// Helper functions
export const getBreedById = async (id: string): Promise<Breed | undefined> => {
  return await breedsApi.getById(id) || undefined;
};

export const getAllBreeds = async (): Promise<Breed[]> => {
  return await breedsApi.getAll();
};
