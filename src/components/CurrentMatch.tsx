import Image from 'next/image';
import { MatchWithTeams } from '@/types/match';
import { usePumpFunEvents } from '@/hooks/usePumpFunEvents';
import { useMarketCap } from '@/hooks/useMarketCap';
// import { usePumpFunWebSocket } from '@/hooks/usePumpFunWebSocket';
import TransactionCarousel from './TransactionCarousel';
import { useMemo } from 'react';

interface CurrentMatchProps {
    match: MatchWithTeams;
}

export default function CurrentMatch({ match }: CurrentMatchProps) {
    // Obtener direcciones de tokens para suscribirse a trades
    const tokenAddresses = useMemo(() => {
        const addresses = [];
        if (match.local_team?.contractAddress) {
            addresses.push(match.local_team.contractAddress);
        }
        if (match.visitant_team?.contractAddress) {
            addresses.push(match.visitant_team.contractAddress);
        }
        return addresses;
    }, [match.local_team?.contractAddress, match.visitant_team?.contractAddress]);

    // Suscribirse a eventos de Pump.fun (SISTEMA ORIGINAL)
    const { events, isConnected, connectionError } = usePumpFunEvents(tokenAddresses);

    // Obtener market cap en tiempo real
    const { marketCap: localMarketCap } = useMarketCap(match.local_team?.contractAddress);
    const { marketCap: visitantMarketCap } = useMarketCap(match.visitant_team?.contractAddress);


    // Pump.fun WebSocket (nuevo sistema) - DISABLED
    // const { isConnected: isWebSocketConnected, events: webSocketEvents } = usePumpFunWebSocket(tokenAddresses);

    const handleXShare = () => {
        const localMC = localMarketCap ? localMarketCap.toLocaleString() : 'N/A';
        const visitantMC = visitantMarketCap ? visitantMarketCap.toLocaleString() : 'N/A';

        const text = `🔥 LIVE MATCH: ${match.local_team?.name} vs ${match.visitant_team?.name} 🔥\n\n${match.local_team?.ticker}: $${localMC}\n${match.visitant_team?.ticker}: $${visitantMC}\n\n#CWC2025 #CryptocurrenciesWorldCup #CryptoTournament`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="w-full mb-12">
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    🔥 LIVE MATCH 🔥
                </h2>
                                <p className="text-lg text-yellow-200 mb-2">
                    Current Tournament Battle
                </p>
                {connectionError && (
                    <p className="text-sm text-yellow-400">
                        ⚠️ Trade monitoring: {connectionError}
                    </p>
                )}
                {isConnected && tokenAddresses.length > 0 && (
                    <p className="text-sm text-emerald-400">
                        ✅ Trade monitoring active ({tokenAddresses.length} tokens)
                    </p>
                )}
                {/* New WebSocket disabled */}
                {/* {isWebSocketConnected && (
                    <p className="text-sm text-purple-400">
                        🔌 Pump.fun WebSocket connected
                    </p>
                )} */}
                {tokenAddresses.length > 0 && (
                    <div className="text-xs text-gray-400 mt-1">
                        Monitoring: {tokenAddresses.map(addr => addr.slice(0, 8) + '...').join(', ')}
                    </div>
                )}
            </div>

            <div className="bg-gradient-to-r from-yellow-600 via-amber-800 to-black rounded-2xl p-6 border-4 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 relative">
                <div className="bg-black/20 rounded-xl p-6 relative">
                    <div className="flex flex-row items-center justify-between gap-4 sm:gap-6">
                        {/* Local Team */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-4">
                                <Image
                                    src={match.local_team?.image || '/assets/cup.png'}
                                    alt={match.local_team?.name || 'Team'}
                                    fill
                                    className="object-contain rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.src = '/assets/cup.png';
                                    }}
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-sm sm:text-xl font-bold text-white mb-1 sm:mb-2">
                                    {match.local_team?.name || 'TBD'}
                                </h3>
                                <p className="text-sm sm:text-lg text-yellow-300 font-mono mb-1 sm:mb-2">
                                    ${match.local_team?.ticker || 'TBD'}
                                </p>
                                <div className="bg-white/10 rounded-lg p-2 sm:p-3 mb-2">
                                    <p className="text-xs sm:text-sm text-gray-300 mb-1">Market Cap</p>
                                    <p className="text-sm sm:text-xl font-bold text-white">
                                        {localMarketCap ? `$${localMarketCap.toLocaleString()}` : 'N/A'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        if ((match.local_team as any)?.contractAddress) {
                                            window.open(`https://pump.fun/coin/${(match.local_team as any).contractAddress}`, '_blank');
                                        } else {
                                            window.open('https://pump.fun', '_blank');
                                        }
                                    }}
                                    className="hover:opacity-80 text-xs sm:text-sm font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-full transition-all duration-300"
                                    style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                                >
                                    Buy on Pump.fun
                                </button>
                            </div>
                        </div>

                        {/* VS Section */}
                        <div className="flex flex-col items-center mx-2 sm:mx-4">
                            <div className="text-center">
                                <div className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">VS</div>
                                <div className="bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                                    LIVE
                                </div>
                            </div>
                        </div>

                        {/* Visitant Team */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-4">
                                <Image
                                    src={match.visitant_team?.image || '/assets/cup.png'}
                                    alt={match.visitant_team?.name || 'Team'}
                                    fill
                                    className="object-contain rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.src = '/assets/cup.png';
                                    }}
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-sm sm:text-xl font-bold text-white mb-1 sm:mb-2">
                                    {match.visitant_team?.name || 'TBD'}
                                </h3>
                                <p className="text-sm sm:text-lg text-yellow-300 font-mono mb-1 sm:mb-2">
                                    ${match.visitant_team?.ticker || 'TBD'}
                                </p>
                                <div className="bg-white/10 rounded-lg p-2 sm:p-3 mb-2">
                                    <p className="text-xs sm:text-sm text-gray-300 mb-1">Market Cap</p>
                                    <p className="text-sm sm:text-xl font-bold text-white">
                                        {visitantMarketCap ? `$${visitantMarketCap.toLocaleString()}` : 'N/A'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        if ((match.visitant_team as any)?.contractAddress) {
                                            window.open(`https://pump.fun/coin/${(match.visitant_team as any).contractAddress}`, '_blank');
                                        } else {
                                            window.open('https://pump.fun', '_blank');
                                        }
                                    }}
                                    className="hover:opacity-80 text-xs sm:text-sm font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-full transition-all duration-300"
                                    style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                                >
                                    Buy on Pump.fun
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Share Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleXShare}
                            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.969-7.58-6.86 7.58H2.25l7.73-8.835L1.732 2.25h7.227l5.969 7.58L18.244 2.25z" />
                            </svg>
                            <span>Share on X</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Transaction Carousel (SISTEMA ORIGINAL) */}
            <TransactionCarousel
                events={events}
                localTeam={{
                    ticker: match.local_team?.ticker || 'TBD',
                    contractAddress: match.local_team?.contractAddress || ''
                }}
                visitantTeam={{
                    ticker: match.visitant_team?.ticker || 'TBD',
                    contractAddress: match.visitant_team?.contractAddress || ''
                }}
            />

            {/* WebSocket Transaction Carousel (New System) - DISABLED */}
            {/* <WebSocketTransactionCarousel
                    events={webSocketEvents}
                    localTeam={{
                        ticker: match.local_team?.ticker || 'TBD',
                        contractAddress: match.local_team?.contractAddress || ''
                    }}
                    visitantTeam={{
                        ticker: match.visitant_team?.ticker || 'TBD',
                        contractAddress: match.visitant_team?.contractAddress || ''
                    }}
                /> */}
        </div>
    );
}
