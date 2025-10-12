'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="w-full bg-gradient-to-r from-black via-gray-900 to-yellow-600 shadow-lg shadow-yellow-500/20">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                            <Image
                                src="/assets/cup.png"
                                alt="Cryptocurrencies World Cup"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                                $CWC
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            href="/about"
                            className="text-white hover:text-yellow-300 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600/20"
                        >
                            Crypto WorldCup?
                        </Link>
                        <Link
                            href="/participants"
                            className="text-white hover:text-yellow-300 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600/20"
                        >
                            Participants
                        </Link>
                        <a
                            href="https://pump.fun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                        >
                            Buy on Pump.fun
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t border-yellow-600/30">
                        <div className="flex flex-col space-y-3 pt-4">
                            <Link
                                href="/about"
                                className="text-white hover:text-yellow-300 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600/20"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Crypto WorldCup?
                            </Link>
                            <Link
                                href="/participants"
                                className="text-white hover:text-yellow-300 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600/20"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Participants
                            </Link>
                            <a
                                href="https://pump.fun"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                                style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                            >
                                Buy on Pump.fun
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
