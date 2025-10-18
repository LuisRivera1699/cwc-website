'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex flex-col">
            <Header />

            <main className="container mx-auto px-4 py-8 flex-1">
                {/* Hero Section */}
                <div className="text-center text-white mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                        THE FIRST CRYPTOCURRENCIES WORLD CUP
                    </h1>
                    <p className="text-xl sm:text-2xl text-yellow-200 mb-8">
                        🏆 The most EPIC memecoin tournament in crypto history 🏆
                    </p>
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-black px-6 py-3 rounded-full inline-block font-bold text-lg shadow-lg shadow-yellow-500/20">
                        🚀 OCTOBER 2025 - THE REVOLUTION BEGINS 🚀
                    </div>
                </div>

                {/* What is CWC Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/30 shadow-lg shadow-yellow-500/10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
                            🌍 What is the Cryptocurrencies World Cup?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-lg text-gray-300 mb-4">
                                    The <span className="text-yellow-400 font-bold">FIRST EVER</span> annual cryptocurrency tournament that brings communities together through epic memecoin battles!
                                </p>
                                <p className="text-lg text-gray-300 mb-4">
                                    This isn't just another tournament - it's a <span className="text-red-400 font-bold">REVOLUTION</span> in how we think about crypto competitions.
                                </p>
                                <p className="text-lg text-gray-300">
                                    Every year, we'll crown the ultimate crypto champion through pure market cap battles!
                                </p>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-center shadow-lg shadow-yellow-500/20">
                                    <h3 className="text-2xl font-bold text-white mb-2">16 TOKENS</h3>
                                    <p className="text-yellow-200">Epic Battles</p>
                                    <div className="mt-4 text-4xl">⚔️</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Matchmaking Ceremony */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/50 shadow-lg shadow-yellow-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
                            🎲 The Epic Matchmaking Ceremony
                        </h2>
                        <div className="text-center mb-8">
                            <div className="bg-white/10 rounded-xl p-6 inline-block">
                                <h3 className="text-2xl font-bold text-white mb-2">LIVE ON PUMP.FUN</h3>
                                <p className="text-yellow-200">Traditional paper lottery draw</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-4">🏆 Tournament Structure</h4>
                                <ul className="space-y-3 text-gray-200">
                                    <li className="flex items-center">
                                        <span className="text-yellow-400 mr-2">🥉</span>
                                        <span><strong>Round of 16:</strong> 3 matches per day (6 hours each)</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-silver-400 mr-2">🥈</span>
                                        <span><strong>Quarter Finals:</strong> 2 matches per day (6 hours each)</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-yellow-500 mr-2">🥇</span>
                                        <span><strong>Semi Finals:</strong> 1 match per day (FULL DAY)</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-yellow-400 mr-2">👑</span>
                                        <span><strong>GRAND FINAL:</strong> 1 match (FULL DAY)</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="bg-white/10 rounded-xl p-6 text-center">
                                    <Image
                                        src="/assets/pill.webp"
                                        alt="Pump.fun"
                                        width={120}
                                        height={120}
                                        className="mx-auto mb-4"
                                    />
                                    <p className="text-white font-bold">Broadcasted Live</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/50 shadow-lg shadow-yellow-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                            ⚔️ How The Battles Work
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold text-white mb-3">Market Cap Wars</h3>
                                <p className="text-gray-200">Tokens compete by market cap. Highest MC wins!</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-bold text-white mb-3">Tie-Breakers</h3>
                                <p className="text-gray-200">Volume → Holders → Real Crypto MC</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="text-xl font-bold text-white mb-3">Time Limits</h3>
                                <p className="text-gray-200">6 hours per match (except semis & final)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Token Creation Process */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/50 shadow-lg shadow-yellow-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                            🪙 Token Creation Process
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">🔒 Anti-Rug Security</h3>
                                <ul className="space-y-3 text-gray-200">
                                    <li className="flex items-start">
                                        <span className="text-green-400 mr-2 mt-1">✅</span>
                                        <span>Dev wallet buys 1 SOL worth of token</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-400 mr-2 mt-1">✅</span>
                                        <span>Sells 20% in 5 transactions for volume</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-400 mr-2 mt-1">✅</span>
                                        <span>Dev wallet keeps ZERO tokens</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-400 mr-2 mt-1">✅</span>
                                        <span>Tokens get CWC ticker suffix</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">💰 Revenue Model</h3>
                                <div className="bg-white/10 rounded-xl p-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-200">CWC Token Creator Rewards:</span>
                                            <span className="text-yellow-400 font-bold">100% to project</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-200">Participant Token Rewards:</span>
                                            <span className="text-green-400 font-bold">50% buy & burn</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-200">Remaining 50%:</span>
                                            <span className="text-blue-400 font-bold">Project profits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-yellow-600/30 shadow-lg shadow-yellow-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            🚀 GET YOUR CWC TOKENS NOW! 🚀
                        </h2>
                        <p className="text-xl text-white mb-8">
                            Don't miss out on the FIRST Cryptocurrencies World Cup!
                        </p>
                        <Link
                            href="https://pump.fun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
                        >
                            🪙 BUY CWC TOKENS 🪙
                        </Link>
                    </div>
                </section>

                {/* Social Media */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/30 shadow-lg shadow-yellow-500/10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                            📱 Stay Connected
                        </h2>
                        <div className="flex justify-center items-center space-x-8">
                            <div className="text-center">
                                <Image
                                    src="/assets/x.webp"
                                    alt="Twitter/X"
                                    width={80}
                                    height={80}
                                    className="mx-auto mb-2"
                                />
                                <p className="text-white font-bold">Follow Updates</p>
                            </div>
                            <div className="text-center">
                                <Image
                                    src="/assets/pill.webp"
                                    alt="Pump.fun"
                                    width={80}
                                    height={80}
                                    className="mx-auto mb-2"
                                />
                                <p className="text-white font-bold">Live Streams</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Winner Prize */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/50 shadow-lg shadow-yellow-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                            🏆 THE ULTIMATE PRIZE 🏆
                        </h2>
                        <div className="text-center">
                            <p className="text-xl text-white mb-6">
                                The winner receives the FIRST Cryptocurrencies World Cup trophy!
                            </p>
                            <div className="bg-black/20 rounded-xl p-6 inline-block">
                                <video
                                    className="w-full max-w-md rounded-lg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src="/videos/rotating-2.mp4" type="video/mp4" />
                                    Your browser does not support the video element.
                                </video>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
