'use client';

import { usePathname } from 'next/navigation';
import CrispProvider from './CrispProvider';

export default function CrispWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide Crisp on admin pages and login page
  const hideChat = pathname?.startsWith('/admin') || pathname?.startsWith('/login');
  
  return (
    <CrispProvider hideChat={hideChat}>
      {children}
    </CrispProvider>
  );
}
