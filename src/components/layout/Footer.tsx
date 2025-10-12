import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-blue-900 to-purple-900 border-t border-blue-800/30">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                            <Image
                                src="/assets/cup.png"
                                alt="Cryptocurrencies World Cup"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                $CWC
                            </h3>
                            <p className="text-sm text-blue-200">
                                Cryptocurrencies World Cup
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Buy on Pump.fun */}
                        <a
                            href="https://pump.fun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                        >
                            <span>Buy on Pump.fun</span>
                        </a>

                        {/* Follow us on X */}
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.969-7.58-6.86 7.58H2.25l7.73-8.835L1.732 2.25h7.227l5.969 7.58L18.244 2.25z" />
                            </svg>
                            <span>Follow us on X</span>
                        </a>

                        {/* Join Telegram */}
                        <a
                            href="https://t.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            <span>Join our TG</span>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-blue-800/30">
                    <p className="text-center text-blue-200 text-sm">
                        © 2025 Cryptocurrencies World Cup. The most epic crypto tournament.
                    </p>
                </div>
            </div>
        </footer>
    );
}
