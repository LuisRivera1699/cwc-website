'use client';

import { useMatches } from '@/hooks/useMatches';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function TournamentBracket() {
    const { matches, teams, loading, error } = useMatches();
    const [tooltipVisible, setTooltipVisible] = useState<{ [key: string]: boolean }>({});

    // Random tooltip system
    useEffect(() => {
        const interval = setInterval(() => {
            const allTokens: string[] = [];
            matches.forEach(match => {
                if (match.local_team) allTokens.push(`${match.id}-local`);
                if (match.visitant_team) allTokens.push(`${match.id}-visitant`);
            });

            if (allTokens.length > 0) {
                const randomToken = allTokens[Math.floor(Math.random() * allTokens.length)];
                setTooltipVisible({ [randomToken]: true });

                // Hide tooltip after 2 seconds
                setTimeout(() => {
                    setTooltipVisible(prev => ({ ...prev, [randomToken]: false }));
                }, 2000);
            }
        }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds

        return () => clearInterval(interval);
    }, [matches]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-lg">Loading tournament...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Error Loading Tournament</h2>
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    // Organize matches by round
    const octavos = matches.filter(match => {
        const id = parseInt(match.id);
        return id >= 1 && id <= 8;
    });
    const cuartos = matches.filter(match => {
        const id = parseInt(match.id);
        return id >= 9 && id <= 12;
    });
    const semis = matches.filter(match => {
        const id = parseInt(match.id);
        return id >= 13 && id <= 14;
    });
    const final = matches.filter(match => {
        const id = parseInt(match.id);
        return id === 15;
    });


    // Create match slots for each round
    const createMatchSlot = (match: any, index: number, round: string) => {
        if (!match) {
            return (
                <div key={`empty-${round}-${index}`} className="w-full min-w-[200px] bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        {/* Local Team Placeholder */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                                <span className="text-gray-500 text-xs">?</span>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-500">
                                    TBD
                                </p>
                                <p className="text-xs text-gray-600 font-mono">
                                    $TBD
                                </p>
                                <p className="text-xs text-gray-500">
                                    MC: N/A
                                </p>
                            </div>
                        </div>

                        {/* VS */}
                        <div className="flex flex-col items-center mx-2 flex-shrink-0">
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-500">VS</div>
                            </div>
                        </div>

                        {/* Visitant Team Placeholder */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                                <span className="text-gray-500 text-xs">?</span>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-500">
                                    TBD
                                </p>
                                <p className="text-xs text-gray-600 font-mono">
                                    $TBD
                                </p>
                                <p className="text-xs text-gray-500">
                                    MC: N/A
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const hasLocalTeam = match.local_team;
        const hasVisitantTeam = match.visitant_team;
        const hasWinner = match.winner_id && match.winner_team;

        if (!hasLocalTeam || !hasVisitantTeam) {
            return (
                <div key={`empty-${round}-${index}`} className="w-full min-w-[200px] bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        {/* Local Team Placeholder */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                                <span className="text-gray-500 text-xs">?</span>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-500">
                                    TBD
                                </p>
                                <p className="text-xs text-gray-600 font-mono">
                                    $TBD
                                </p>
                                <p className="text-xs text-gray-500">
                                    MC: N/A
                                </p>
                            </div>
                        </div>

                        {/* VS */}
                        <div className="flex flex-col items-center mx-2 flex-shrink-0">
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-500">VS</div>
                            </div>
                        </div>

                        {/* Visitant Team Placeholder */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                                <span className="text-gray-500 text-xs">?</span>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-500">
                                    TBD
                                </p>
                                <p className="text-xs text-gray-600 font-mono">
                                    $TBD
                                </p>
                                <p className="text-xs text-gray-500">
                                    MC: N/A
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div key={match.id} className={`w-full min-w-[200px] rounded-lg border-2 p-3 ${hasWinner
                ? 'bg-gradient-to-r from-green-800 to-green-900 border-green-600'
                : 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600'
                }`}>
                <div className="flex items-center justify-between">
                    {/* Local Team */}
                    <div className="flex flex-col items-center text-center flex-1 relative">
                        {/* Tooltip */}
                        {tooltipVisible[`${match.id}-local`] && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-bounce z-10">
                                Buy me! 🚀
                            </div>
                        )}

                        <div className="relative w-10 h-10 mb-2">
                            <Image
                                src={match.local_team.image}
                                alt={match.local_team.name}
                                fill
                                className="object-contain rounded-full cursor-pointer hover:scale-110 transition-transform"
                                onError={(e) => {
                                    e.currentTarget.src = '/assets/cup.png';
                                }}
                                onClick={() => {
                                    if (match.local_team.contractAddress) {
                                        window.open(`https://pump.fun/coin/${match.local_team.contractAddress}`, '_blank');
                                    } else {
                                        window.open('https://pump.fun', '_blank');
                                    }
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-white truncate">
                                {match.local_team.name}
                            </p>
                            <p className="text-xs text-blue-300 font-mono">
                                ${match.local_team.ticker}
                            </p>
                            <p className="text-xs text-gray-300">
                                MC: ${match.local_mc ? match.local_mc.toLocaleString() : 'N/A'}
                            </p>
                            <button
                                onClick={() => {
                                    if (match.local_team.contractAddress) {
                                        window.open(`https://pump.fun/coin/${match.local_team.contractAddress}`, '_blank');
                                    } else {
                                        window.open('https://pump.fun', '_blank');
                                    }
                                }}
                                className="mt-1 hover:opacity-80 text-xs font-bold py-1 px-2 rounded-full transition-all duration-300"
                                style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>

                    {/* VS or Winner */}
                    <div className="flex flex-col items-center mx-2 flex-shrink-0">
                        {hasWinner ? (
                            <div className="text-center">
                                <div className="text-xs text-yellow-400 font-bold mb-1">WINNER</div>
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={match.winner_team!.image}
                                        alt={match.winner_team!.name}
                                        fill
                                        className="object-contain rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.src = '/assets/cup.png';
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-yellow-400 font-mono">
                                    ${match.winner_team!.ticker}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-sm font-bold text-white">VS</div>
                            </div>
                        )}
                    </div>

                    {/* Visitant Team */}
                    <div className="flex flex-col items-center text-center flex-1 relative">
                        {/* Tooltip */}
                        {tooltipVisible[`${match.id}-visitant`] && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-bounce z-10">
                                Buy me! 🚀
                            </div>
                        )}

                        <div className="relative w-10 h-10 mb-2">
                            <Image
                                src={match.visitant_team.image}
                                alt={match.visitant_team.name}
                                fill
                                className="object-contain rounded-full cursor-pointer hover:scale-110 transition-transform"
                                onError={(e) => {
                                    e.currentTarget.src = '/assets/cup.png';
                                }}
                                onClick={() => {
                                    if (match.visitant_team.contractAddress) {
                                        window.open(`https://pump.fun/coin/${match.visitant_team.contractAddress}`, '_blank');
                                    } else {
                                        window.open('https://pump.fun', '_blank');
                                    }
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-white truncate">
                                {match.visitant_team.name}
                            </p>
                            <p className="text-xs text-blue-300 font-mono">
                                ${match.visitant_team.ticker}
                            </p>
                            <p className="text-xs text-gray-300">
                                MC: ${match.visitant_mc ? match.visitant_mc.toLocaleString() : 'N/A'}
                            </p>
                            <button
                                onClick={() => {
                                    if (match.visitant_team.contractAddress) {
                                        window.open(`https://pump.fun/coin/${match.visitant_team.contractAddress}`, '_blank');
                                    } else {
                                        window.open('https://pump.fun', '_blank');
                                    }
                                }}
                                className="mt-1 hover:opacity-80 text-xs font-bold py-1 px-2 rounded-full transition-all duration-300"
                                style={{ backgroundColor: '#14151A', color: '#9EECB0' }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
                $CWC 2025 BRACKETS
            </h2>
            <p className="text-center text-blue-200 mb-8 text-sm sm:text-base">
                🚀 Click on any token to buy it on Pump.fun and support your favorite team! 🚀
            </p>

            <div className="w-full overflow-x-auto">
                <div className="min-w-[1400px] mx-auto">
                    <div className="flex gap-4 items-center">
                        {/* 4 primeros octavos */}
                        <div className="w-48 space-y-4">
                            <h3 className="text-lg font-bold text-yellow-400 text-center mb-4">
                                Round of 16
                            </h3>
                            <div className="space-y-3">
                                {Array.from({ length: 4 }, (_, i) => {
                                    const match = octavos.find(m => parseInt(m.id) === i + 1);
                                    return createMatchSlot(match, i, 'octavos-1');
                                })}
                            </div>
                        </div>

                        {/* 2 primeros cuartos */}
                        <div className="w-48 space-y-4">
                            <h3 className="text-lg font-bold text-blue-400 text-center mb-4">
                                Quarter Finals
                            </h3>
                            <div className="space-y-3">
                                {Array.from({ length: 2 }, (_, i) => {
                                    const match = cuartos.find(m => parseInt(m.id) === i + 9);
                                    return createMatchSlot(match, i, 'cuartos-1');
                                })}
                            </div>
                        </div>

                        {/* Primera semifinal */}
                        <div className="w-48 space-y-4">
                            <h3 className="text-lg font-bold text-purple-400 text-center mb-4">
                                Semi Finals
                            </h3>
                            <div className="space-y-3">
                                {Array.from({ length: 1 }, (_, i) => {
                                    const match = semis.find(m => parseInt(m.id) === 13);
                                    return createMatchSlot(match, i, 'semi-1');
                                })}
                            </div>
                        </div>

                        {/* Final */}
                        <div className="w-48 space-y-4">
                            <div className="text-center mb-4">
                                <div className="relative w-16 h-16 mx-auto mb-2">
                                    <Image
                                        src="/assets/cup.png"
                                        alt="CWC Trophy"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-yellow-400">
                                    🏆 GRAND FINAL 🏆
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {Array.from({ length: 1 }, (_, i) => {
                                    const match = final.find(m => parseInt(m.id) === 15);
                                    return createMatchSlot(match, i, 'final');
                                })}
                            </div>
                        </div>

                        {/* Segunda semifinal */}
                        <div className="w-48 space-y-4">
                            <h3 className="text-lg font-bold text-purple-400 text-center mb-4">
                                Semi Finals
                            </h3>
                            <div className="space-y-3">
                                {Array.from({ length: 1 }, (_, i) => {
                                    const match = semis.find(m => parseInt(m.id) === 14);
                                    return createMatchSlot(match, i, 'semi-2');
                                })}
                            </div>
                        </div>

                        {/* 2 últimos cuartos */}
                        <div className="w-48 space-y-4">
                            <h3 className="text-lg font-bold text-blue-400 text-center mb-4">
                                Quarter Finals
                            </h3>
                            <div className="space-y-3">
                                {Array.from({ length: 2 }, (_, i) => {
                                    const match = cuartos.find(m => parseInt(m.id) === i + 11);
                                    return createMatchSlot(match, i, 'cuartos-2');
                                })}
                            </div>
                        </div>

                        {/* 4 últimos octavos */}
                        <div className="w-48 space-y-4">
                            <h3 className="text-lg font-bold text-yellow-400 text-center mb-4">
                                Round of 16
                            </h3>
                            <div className="space-y-3">
                                {Array.from({ length: 4 }, (_, i) => {
                                    const match = octavos.find(m => parseInt(m.id) === i + 5);
                                    return createMatchSlot(match, i, 'octavos-2');
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
