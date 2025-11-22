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
  parents: {
    sire: string;
    dam: string;
  };
  vaccinations: string[];
  price: number;
  notes: string;
}

export const puppies: Puppy[] = [
  {
    id: 'p-001',
    name: 'Luna',
    breed: 'Maltipoo',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-01',
    images: ['/images/icons/hero-puppy.jpg'],
    color: 'apricot',
    generation: 'F1b',
    parents: {
      sire: '/images/parents/maltipoo-sire-1.jpg',
      dam: '/images/parents/maltipoo-dam-1.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies'],
    price: 2600,
    notes: 'Family raised, very playful and affectionate'
  },
  {
    id: 'p-002',
    name: 'Max',
    breed: 'Goldendoodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-08-15',
    images: ['/images/icons/hero-puppy.jpg'],
    color: 'cream',
    generation: 'F1',
    parents: {
      sire: '/images/parents/goldendoodle-sire-1.jpg',
      dam: '/images/parents/goldendoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP'],
    price: 2800,
    notes: 'Gentle temperament, great with kids'
  },
  {
    id: 'p-003',
    name: 'Bella',
    breed: 'Labradoodle',
    status: 'reserved',
    gender: 'female',
    birthDate: '2025-08-20',
    images: ['/images/icons/hero-puppy.jpg'],
    color: 'chocolate',
    generation: 'F1b',
    parents: {
      sire: '/images/parents/labradoodle-sire-1.jpg',
      dam: '/images/parents/labradoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP', 'Bordetella'],
    price: 2500,
    notes: 'Smart and trainable, loves water'
  },
  {
    id: 'p-004',
    name: 'Charlie',
    breed: 'Bernedoodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-09-05',
    images: ['/images/icons/hero-puppy.jpg'],
    color: 'tri-color',
    generation: 'F1',
    parents: {
      sire: '/images/parents/bernedoodle-sire-1.jpg',
      dam: '/images/parents/bernedoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP'],
    price: 3200,
    notes: 'Calm and loyal, excellent family dog'
  },
  {
    id: 'p-005',
    name: 'Daisy',
    breed: 'Maltipoo',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-01',
    images: ['/images/icons/hero-puppy.jpg'],
    color: 'white',
    generation: 'F1b',
    parents: {
      sire: '/images/parents/maltipoo-sire-2.jpg',
      dam: '/images/parents/maltipoo-dam-2.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies'],
    price: 2600,
    notes: 'Sweet and cuddly, loves attention'
  },
  {
    id: 'p-006',
    name: 'Cooper',
    breed: 'Goldendoodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-08-15',
    images: ['/images/icons/hero-puppy.jpg'],
    color: 'golden',
    generation: 'F1',
    parents: {
      sire: '/images/parents/goldendoodle-sire-1.jpg',
      dam: '/images/parents/goldendoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP'],
    price: 2800,
    notes: 'Energetic and friendly, loves to play'
  }
];

export const getPuppyById = (id: string): Puppy | undefined => {
  return puppies.find(puppy => puppy.id === id);
};

export const getPuppiesByBreed = (breed: string): Puppy[] => {
  return puppies.filter(puppy => puppy.breed === breed);
};

export const getAvailablePuppies = (): Puppy[] => {
  return puppies.filter(puppy => puppy.status === 'available');
};
