export interface Puppy {
  id: string;
  name: string;
  breed: string;
  status: 'available' | 'reserved' | 'adopted';
  gender: 'male' | 'female';
  birthDate: string;
  images: string[];
  color: string;
  generation: string;
  parents?: {
    mother: string;
  };
  vaccinations: string[];
  price: number;
  notes?: string;
  damImage?: string;
  sireId?: string;
  damId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'https://pup-server.vercel.app' : 'http://localhost:4000');

export const puppiesApi = {
  async getAll(): Promise<Puppy[]> {
    const response = await fetch(`${API_BASE_URL}/api/puppies`);
    if (!response.ok) {
      throw new Error('Failed to fetch puppies');
    }
    return response.json();
  },

  async getById(id: string): Promise<Puppy | null> {
    const response = await fetch(`${API_BASE_URL}/api/puppies/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch puppy');
    }
    return response.json();
  },

  async getAvailable(): Promise<Puppy[]> {
    const response = await fetch(`${API_BASE_URL}/api/puppies/status/available`);
    if (!response.ok) {
      throw new Error('Failed to fetch available puppies');
    }
    return response.json();
  },

  async getByBreed(breed: string): Promise<Puppy[]> {
    const response = await fetch(`${API_BASE_URL}/api/puppies/breed/${encodeURIComponent(breed)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch puppies by breed');
    }
    return response.json();
  }
};

// Helper functions
export const getPuppyById = async (id: string): Promise<Puppy | undefined> => {
  return await puppiesApi.getById(id) || undefined;
};

export const getPuppiesByBreed = async (breed: string): Promise<Puppy[]> => {
  return await puppiesApi.getByBreed(breed);
};

export const getAvailablePuppies = async (): Promise<Puppy[]> => {
  return await puppiesApi.getAvailable();
};
