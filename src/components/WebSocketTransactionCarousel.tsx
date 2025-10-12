'use client';

import { useEffect, useState } from 'react';

interface TradeEvent {
    signature: string;
    sol_amount: number;
    token_amount: number;
    is_buy: boolean;
    user: string;
    timestamp: number;
    mint: string;
    name: string;
    symbol: string;
    [key: string]: any;
}

interface TeamInfo {
    ticker: string;
    contractAddress: string;
}

interface WebSocketTransactionCarouselProps {
    events: TradeEvent[];
    localTeam: TeamInfo;
    visitantTeam: TeamInfo;
}

interface DisplayTransaction {
    id: string;
    type: 'buy' | 'sell';
    ticker: string;
    amount: number;
    timestamp: number;
}

export default function WebSocketTransactionCarousel({ events, localTeam, visitantTeam }: WebSocketTransactionCarouselProps) {
    const [transactions, setTransactions] = useState<DisplayTransaction[]>([]);

    // console.log('🎪 WebSocketTransactionCarousel render:', {
    //     eventsCount: events.length,
    //     transactionsCount: transactions.length,
    //     localTeam: localTeam.ticker,
    //     visitantTeam: visitantTeam.ticker
    // });

    useEffect(() => {
        const newTransactions: DisplayTransaction[] = [];

        events.forEach(event => {
            const isLocal = event.mint === localTeam.contractAddress;
            const isVisitant = event.mint === visitantTeam.contractAddress;

            if (isLocal || isVisitant) {
                const ticker = isLocal ? localTeam.ticker : visitantTeam.ticker;
                const type = event.is_buy ? 'buy' : 'sell';
                const amount = event.token_amount;

                newTransactions.push({
                    id: event.signature,
                    type,
                    ticker,
                    amount,
                    timestamp: event.timestamp,
                });
            }
        });

        if (newTransactions.length > 0) {
            setTransactions((prev) => {
                // Filtrar duplicados por signature
                const existingIds = new Set(prev.map(t => t.id));
                const uniqueNewTransactions = newTransactions.filter(tx => !existingIds.has(tx.id));

                const updated = [...prev, ...uniqueNewTransactions].sort((a, b) => a.timestamp - b.timestamp);
                // Keep only transactions from the last 10 seconds to prevent excessive growth
                // Convert timestamp from seconds to milliseconds for comparison
                const now = Date.now();
                const filtered = updated.filter(t => {
                    const timeDiff = now - (t.timestamp * 1000);
                    return timeDiff < 10000;
                });
                return filtered;
            });

            // Set timeouts to remove transactions after 2 seconds
            newTransactions.forEach(tx => {
                setTimeout(() => {
                    setTransactions(prev => prev.filter(t => t.id !== tx.id));
                }, 2000);
            });
        }

    }, [events, localTeam, visitantTeam]);

    if (transactions.length === 0) return null;

    return (
        <div className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-600 shadow-lg">
            <h4 className="text-sm font-bold text-white mb-3 text-center">Live Trades (WebSocket)</h4>
            <div className="flex flex-wrap gap-2 justify-center overflow-x-auto pb-2">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className={`px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center space-x-1
                            ${tx.type === 'buy' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                        `}
                    >
                        <span>{tx.type === 'buy' ? '🟢 BUY' : '🔴 SELL'}</span>
                        <span>{tx.ticker}</span>
                        <span>{tx.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
