import HeroSection from './components/organisms/HeroSection';
import ValuePropositionSection from './components/organisms/ValuePropositionSection';
import AvailablePuppiesPreview from './components/organisms/AvailablePuppiesPreview';
import HowItWorksSection from './components/organisms/HowItWorksSection';
import TestimonialsSection from './components/organisms/TestimonialsSection';
import HealthGuaranteeSection from './components/organisms/HealthGuaranteeSection';
import BlackFridayInteractiveSection from './components/organisms/BlackFridayInteractiveSection';
import TrainingSection from './components/organisms/TrainingSection';
import FAQPreviewSection from './components/organisms/FAQPreviewSection';

/**
 * Homepage for PuppyHub USA
 * Displays all homepage sections in the required order
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropositionSection />
      <AvailablePuppiesPreview />
      <HowItWorksSection />
      <TestimonialsSection />
      <HealthGuaranteeSection />
      <BlackFridayInteractiveSection />
      <TrainingSection />
      <FAQPreviewSection />
    </>
  );
}
