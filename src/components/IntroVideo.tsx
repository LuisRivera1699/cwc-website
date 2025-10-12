'use client';

import { useState, useRef, useEffect } from 'react';

interface IntroVideoProps {
    onVideoEnd: () => void;
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
    const [isVisible, setIsVisible] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            setIsVisible(false);
            setTimeout(() => {
                onVideoEnd();
            }, 500); // Delay para la transición suave
        };

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [onVideoEnd]);

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            style={{ backgroundColor: '#15204F' }}
        >
            <div className="flex items-center justify-center w-full h-full">
                <video
                    ref={videoRef}
                    className="max-h-full max-w-full object-contain"
                    autoPlay
                    muted
                    playsInline
                >
                    <source src="/videos/zoom.mp4" type="video/mp4" />
                    Your browser does not support the video element.
                </video>
            </div>
        </div>
    );
}
