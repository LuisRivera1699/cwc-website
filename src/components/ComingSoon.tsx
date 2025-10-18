'use client';

import { useState, useEffect } from 'react';

export default function ComingSoon() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2025-11-01T00:00:00Z').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <video
                    className="w-auto h-full object-cover opacity-30"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/videos/rotating-2.mp4" type="video/mp4" />
                    Your browser does not support the video element.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Logo/Title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        🏆 Cryptocurrencies World Cup 🏆 <br />The most epic cryptocurrency competition
                    </h1>
                </div>

                {/* Launch Date */}
                <div className="mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Launching November 1st, 2025
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                        Get ready for the ultimate crypto tournament experience
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="mb-12">
                    <h4 className="text-xl font-bold text-white mb-6">Countdown to Launch</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                                {timeLeft.days}
                            </div>
                            <div className="text-sm text-gray-300">Days</div>
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                                {timeLeft.hours}
                            </div>
                            <div className="text-sm text-gray-300">Hours</div>
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                                {timeLeft.minutes}
                            </div>
                            <div className="text-sm text-gray-300">Minutes</div>
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                                {timeLeft.seconds}
                            </div>
                            <div className="text-sm text-gray-300">Seconds</div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-6">
                        Keep Updated on Our Networks
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* X (Twitter) Button */}
                        <a
                            href="https://x.com/cryptoworlcup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center space-x-3 border border-gray-600 hover:border-gray-400"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.969-7.58-6.86 7.58H2.25l7.73-8.835L1.732 2.25h7.227l5.969 7.58L18.244 2.25z" />
                            </svg>
                            <span>Follow us on X</span>
                        </a>

                        {/* Telegram Button */}
                        <a
                            href="https://t.me/cryptocurrenciesworldcup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center space-x-3"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            <span>Join our Telegram</span>
                        </a>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-gray-400 text-sm">
                    <p>16 tokens, one winner. The ultimate crypto tournament is coming.</p>
                </div>
            </div>
        </div >
    );
}
