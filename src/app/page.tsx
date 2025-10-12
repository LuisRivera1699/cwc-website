'use client';

import { useState } from 'react';
import IntroVideo from '@/components/IntroVideo';
import HomePage from '@/components/HomePage';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroVideo onVideoEnd={handleVideoEnd} />}
      {!showIntro && <HomePage />}
    </>
  );
}
