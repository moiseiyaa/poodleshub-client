import HeroSection from './components/organisms/HeroSection';
import ValuePropositionSection from './components/organisms/ValuePropositionSection';
import AvailablePuppiesPreview from './components/organisms/AvailablePuppiesPreview';
import HowItWorksSection from './components/organisms/HowItWorksSection';
import dynamic from 'next/dynamic';

// Lazy load heavy sections that are not immediately visible
const LazyTestimonialsSection = dynamic(() => import('./components/organisms/TestimonialsSection'), {
  loading: () => <div className="py-16 text-center">Loading testimonials...</div>,
});
const LazyHealthGuaranteeSection = dynamic(() => import('./components/organisms/HealthGuaranteeSection'), {
  loading: () => <div className="py-16 text-center">Loading health guarantee...</div>,
});
const LazyBlackFridayInteractiveSection = dynamic(() => import('./components/organisms/BlackFridayInteractiveSection'), {
  loading: () => <div className="py-16 text-center">Loading special offers...</div>,
});
const LazyTrainingSection = dynamic(() => import('./components/organisms/TrainingSection'), {
  loading: () => <div className="py-16 text-center">Loading training info...</div>,
});
const LazyFAQPreviewSection = dynamic(() => import('./components/organisms/FAQPreviewSection'), {
  loading: () => <div className="py-16 text-center">Loading FAQ...</div>,
});

/**
 * Homepage for PuppyHub USA
 * Displays all homepage sections in the required order
 * Optimized for performance with lazy loading
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropositionSection />
      <AvailablePuppiesPreview />
      <HowItWorksSection />
      <LazyTestimonialsSection />
      <LazyHealthGuaranteeSection />
      <LazyBlackFridayInteractiveSection />
      <LazyTrainingSection />
      <LazyFAQPreviewSection />
    </>
  );
}
