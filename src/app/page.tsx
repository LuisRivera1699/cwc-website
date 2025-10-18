'use client';

import { useState } from 'react';
import { IS_LAUNCHED } from '@/config/launch';
import ComingSoon from '@/components/ComingSoon';
import IntroVideo from '@/components/IntroVideo';
import HomePage from '@/components/HomePage';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  // Show coming soon page if not launched
  if (!IS_LAUNCHED) {
    return <ComingSoon />;
  }

  // Show normal application flow if launched
  return (
    <>
      {showIntro && <IntroVideo onVideoEnd={handleVideoEnd} />}
      {!showIntro && <HomePage />}
    </>
  );
}
