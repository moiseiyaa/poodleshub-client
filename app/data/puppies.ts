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
    mother: string;
  };
  vaccinations: string[];
  price: number;
  notes: string;
}

export const puppies: Puppy[] = [
  {
    id: 'p-101',
    name: 'Sophie',
    breed: 'Poodle',
    status: 'available',
    gender: 'female',
    birthDate: '2025-08-25',
    images: ['/images/puppies/sophie-1.jpg', '/images/puppies/sophie-2.jpg', '/images/puppies/sophie-3.jpg'],
    color: 'apricot',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/poodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies', 'Bordetella'],
    price: 875,
    notes: 'Miniature Poodle, very intelligent and eager to learn. Excellent with children and other pets.'
  },
  {
    id: 'p-102',
    name: 'Oliver',
    breed: 'Poodle',
    status: 'reserved',
    gender: 'male',
    birthDate: '2025-09-10',
    images: ['/images/puppies/oliver-1.jpg', '/images/puppies/oliver-2.jpg'],
    color: 'black',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/poodle-dam-2.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies'],
    price: 925,
    notes: 'Standard Poodle, confident and athletic. Great for active families who enjoy outdoor activities.'
  },
  {
    id: 'p-103',
    name: 'Lily',
    breed: 'Poodle',
    status: 'available',
    gender: 'female',
    birthDate: '2025-08-30',
    images: ['/images/puppies/lily-1.jpg', '/images/puppies/lily-2.jpg', '/images/puppies/lily-3.jpg'],
    color: 'white',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/poodle-dam-3.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies', 'Bordetella'],
    price: 799,
    notes: 'Toy Poodle, affectionate and playful. Perfect companion for apartment living or smaller homes.'
  },
  {
    id: 'p-201',
    name: 'Princess',
    breed: 'Maltese',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-05',
    images: ['/images/puppies/princess-1.jpg', '/images/puppies/princess-2.jpg', '/images/puppies/princess-3.png'],
    color: 'white',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/maltese-dam-1.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies', 'Bordetella'],
    price: 899,
    notes: 'Elegant and graceful, loves to be pampered. Perfect lap dog with a sweet, gentle personality.'
  },
  {
    id: 'p-202',
    name: 'Bentley',
    breed: 'Maltese',
    status: 'available',
    gender: 'male',
    birthDate: '2025-08-28',
    images: ['/images/puppies/bentley-1.jpg', '/images/puppies/bentley-2.jpg'],
    color: 'white',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/maltese-dam-2.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies'],
    price: 925,
    notes: 'Playful and energetic, loves attention. Great with children and makes an excellent family companion.'
  },
  {
    id: 'p-203',
    name: 'Angel',
    breed: 'Maltese',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-12',
    images: ['/images/puppies/angel-1.jpg', '/images/puppies/angel-2.jpg', '/images/puppies/angel-3.jpg'],
    color: 'cream',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/maltese-dam-3.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies', 'Bordetella'],
    price: 875,
    notes: 'Sweet and affectionate, loves to cuddle. Ideal companion for seniors or those seeking a calm, loving pet.'
  },
  {
    id: 'p-001',
    name: 'Luna',
    breed: 'Maltipoo',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-01',
    images: ['/images/puppies/luna-1.jpg', '/images/puppies/luna-2.jpg', '/images/puppies/luna-3.jpg'],
    color: 'apricot',
    generation: 'F1b',
    parents: {
      mother: '/images/parents/maltipoo-dam-1.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies'],
    price: 825,
    notes: 'Family raised, very playful and affectionful'
  },
  {
    id: 'p-002',
    name: 'Max',
    breed: 'Goldendoodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-08-15',
    images: ['/images/puppies/max-1.jpg', '/images/puppies/max-2.jpg'],
    color: 'cream',
    generation: 'F1',
    parents: {
      mother: '/images/parents/goldendoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP'],
    price: 875,
    notes: 'Gentle temperament, great with kids'
  },
  {
    id: 'p-003',
    name: 'Bella',
    breed: 'Labradoodle',
    status: 'reserved',
    gender: 'female',
    birthDate: '2025-08-20',
    images: ['/images/puppies/bella-1.jpg', '/images/puppies/bella-2.jpg'],
    color: 'chocolate',
    generation: 'F1b',
    parents: {
      mother: '/images/parents/labradoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP', 'Bordetella'],
    price: 699,
    notes: 'Smart and trainable, loves water'
  },
  {
    id: 'p-004',
    name: 'Charlie',
    breed: 'Bernedoodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-09-05',
    images: ['/images/puppies/charlie-1.jpg', '/images/puppies/charlie-2.jpg'],
    color: 'tri-color',
    generation: 'F1',
    parents: {
      mother: '/images/parents/bernedoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP'],
    price: 975,
    notes: 'Calm and loyal, excellent family dog'
  },
  {
    id: 'p-005',
    name: 'Daisy',
    breed: 'Maltipoo',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-01',
    images: ['/images/puppies/daisy-1.jpg', '/images/puppies/daisy-2.jpg'],
    color: 'white',
    generation: 'F1b',
    parents: {
      mother: '/images/parents/maltipoo-dam-2.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies'],
    price: 825,
    notes: 'Sweet and cuddly, loves attention'
  },
  {
    id: 'p-006',
    name: 'Cooper',
    breed: 'Goldendoodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-08-15',
    images: ['/images/puppies/cooper-1.jpg', '/images/puppies/cooper-2.jpg'],
    color: 'golden',
    generation: 'F1',
    parents: {
      mother: '/images/parents/goldendoodle-dam-1.jpg'
    },
    vaccinations: ['DHLPP'],
    price: 875,
    notes: 'Energetic and friendly, loves to play'
  },
  {
    id: 'p-104',
    name: 'Jasper',
    breed: 'Poodle',
    status: 'available',
    gender: 'male',
    birthDate: '2025-09-15',
    images: ['/images/puppies/jasper-lizzy-1.jpg'],
    color: 'black',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/poodle-dam-4.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies', 'Bordetella'],
    price: 1650,
    notes: 'Part of a bonded pair with Lizzy. These siblings are best friends and should be adopted together for optimal happiness and well-being.'
  },
  {
    id: 'p-105',
    name: 'Lizzy',
    breed: 'Poodle',
    status: 'available',
    gender: 'female',
    birthDate: '2025-09-15',
    images: ['/images/puppies/jasper-lizzy-1.jpg'],
    color: 'brown',
    generation: 'Purebred',
    parents: {
      mother: '/images/parents/poodle-dam-4.jpg'
    },
    vaccinations: ['DHLPP', 'Rabies', 'Bordetella'],
    price: 1650,
    notes: 'Part of a bonded pair with Jasper. These siblings are best friends and should be adopted together for optimal happiness and well-being.'
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
