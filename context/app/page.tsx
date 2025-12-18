// app/page.tsx
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role === 'asha') {
      router.replace('/dashboard');
    } else if (role === 'phc') {
      router.replace('/phc/dashboard');
    } else {
      router.replace('/login');
    }
  }, [role, router]);

  // Render a loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}