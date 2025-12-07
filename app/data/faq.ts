export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I adopt a puppy from PuppyHub USA?",
    answer: "To adopt a puppy, browse our available puppies, select the one you're interested in, and submit an application. Our team will review your application and contact you to discuss next steps, including deposit payment and delivery arrangements.",
    category: "adoption-process"
  },
  {
    id: "faq-2",
    question: "What is included in your health guarantee?",
    answer: "Our 12-year health guarantee covers genetic conditions that impact your puppy's quality of life. It includes detailed health records, vaccination history, and ongoing support. If any covered condition arises, we provide support for veterinary expenses according to our guarantee terms.",
    category: "health"
  },
  {
    id: "faq-3",
    question: "How are puppies delivered to their new homes?",
    answer: "We offer several delivery options including in-person pickup, ground transportation for regional adoptions, and air transportation with a flight nanny for longer distances. All transportation methods prioritize your puppy's comfort and safety.",
    category: "delivery"
  },
  {
    id: "faq-4",
    question: "What is the adoption fee and what does it cover?",
    answer: "Adoption fees vary by breed and typically range from $450 to $1,000. Individual puppies are priced at $450-$550, while bonded pairs are available at $1,000. This fee covers the puppy's care prior to adoption, vaccinations, health checks, microchipping, initial training, and a starter kit with food, toys, and care instructions.",
    category: "fees"
  },
  {
    id: "faq-5",
    question: "How do you select and screen your breeders?",
    answer: "We partner only with ethical breeders who meet our strict standards for dog care, living conditions, and breeding practices. We personally visit and inspect all breeding facilities, verify health testing of parent dogs, and ensure proper socialization of puppies.",
    category: "breeders"
  },
  {
    id: "faq-6",
    question: "What training options do you offer?",
    answer: "We offer several training packages including Basic Training, Advanced Training, and Board & Train programs. Each program is tailored to different needs and includes various levels of commands, socialization, and behavior management.",
    category: "training"
  },
  {
    id: "faq-7",
    question: "Can I visit the puppies before adopting?",
    answer: "In many cases, yes! We encourage visits when geographically feasible. Please contact us to discuss visitation options and availability in your area.",
    category: "adoption-process"
  },
  {
    id: "faq-8",
    question: "What happens if the puppy isn't a good fit for my family?",
    answer: "We have a 14-day adjustment period. If unforeseen circumstances arise making the adoption unsuitable, we work with you on a case-by-case basis to find a solution, which may include rehoming assistance or accepting the puppy back according to our return policy.",
    category: "adoption-process"
  },
  {
    id: "faq-9",
    question: "How do you ensure puppies are well-socialized?",
    answer: "Our puppies are raised in family environments with regular human interaction, exposure to household sounds, and appropriate early socialization with other animals when possible. We also begin basic training and handling exercises from an early age.",
    category: "health"
  },
  {
    id: "faq-10",
    question: "Do you offer support after adoption?",
    answer: "Absolutely! We provide ongoing support throughout your puppy's life, including training guidance, health advice, and assistance with any concerns that may arise. Our team is just a phone call or email away whenever you need help.",
    category: "adoption-process"
  }
];

export const getFrequentlyAskedQuestions = (limit?: number): FAQ[] => {
  if (limit) {
    return faqs.slice(0, limit);
  }
  return faqs;
};

export const getFAQsByCategory = (category: string): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};
