"use client"; 
import React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/jobs');
  }, [router]);

  return null;
}
