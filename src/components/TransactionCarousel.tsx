'use client';

import { useEffect, useState, useRef } from 'react';

interface PumpFunEvent {
    type: string;
    data: {
        txType: string;
        tokenAmount: number;
        mint: string;
    };
    timestamp: number;
}

interface TransactionCarouselProps {
    events: PumpFunEvent[];
    localTeam: {
        ticker: string;
        contractAddress: string;
    };
    visitantTeam: {
        ticker: string;
        contractAddress: string;
    };
}

interface TransactionItem {
    id: string;
    type: 'buy' | 'sell';
    ticker: string;
    amount: number;
    timestamp: number;
}

export default function TransactionCarousel({ events, localTeam, visitantTeam }: TransactionCarouselProps) {
    const [transactions, setTransactions] = useState<TransactionItem[]>([]);
    const processedEventsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const now = Date.now();
        const newTransactions: TransactionItem[] = [];

        // Filtrar eventos recientes (últimos 10 segundos) y no procesados
        const recentEvents = events.filter(event => {
            const eventId = `${event.data.mint}-${event.timestamp}`;
            const isRecent = now - event.timestamp < 10000;
            const notProcessed = !processedEventsRef.current.has(eventId);

            if (isRecent && notProcessed) {
                processedEventsRef.current.add(eventId);
                return true;
            }
            return false;
        });

        recentEvents.forEach(event => {
            // Determinar si es local o visitant
            const isLocal = event.data.mint === localTeam.contractAddress;
            const isVisitant = event.data.mint === visitantTeam.contractAddress;

            if (isLocal || isVisitant) {
                const ticker = isLocal ? localTeam.ticker : visitantTeam.ticker;
                const transaction: TransactionItem = {
                    id: `${event.data.mint}-${event.timestamp}`,
                    type: event.data.txType as 'buy' | 'sell',
                    ticker,
                    amount: event.data.tokenAmount,
                    timestamp: event.timestamp
                };

                newTransactions.push(transaction);
            }
        });

        // Agregar nuevas transacciones
        if (newTransactions.length > 0) {
            setTransactions(prev => {
                const updated = [...prev, ...newTransactions];
                // Limitar a máximo 20 transacciones para evitar crecimiento excesivo
                return updated.slice(-20);
            });

            // Remover transacciones después de 2 segundos
            newTransactions.forEach(transaction => {
                setTimeout(() => {
                    setTransactions(prev => prev.filter(t => t.id !== transaction.id));
                }, 2000);
            });
        }

        // Limpiar transacciones muy antiguas (más de 30 segundos)
        setTransactions(prev => {
            const filtered = prev.filter(t => now - t.timestamp < 30000);
            return filtered;
        });

        // Limpiar eventos procesados muy antiguos (más de 60 segundos)
        const oldEventIds: string[] = [];
        processedEventsRef.current.forEach(eventId => {
            const timestamp = parseInt(eventId.split('-').pop() || '0');
            if (now - timestamp > 60000) {
                oldEventIds.push(eventId);
            }
        });
        oldEventIds.forEach(eventId => {
            processedEventsRef.current.delete(eventId);
        });

    }, [events, localTeam, visitantTeam]);

    if (transactions.length === 0) return null;

    return (
        <div className="w-full mt-4">
            <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
                <div className="text-center mb-2">
                    <h4 className="text-sm font-bold text-white">Live Transactions</h4>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={`px-3 py-1 rounded-full text-xs font-bold animate-pulse ${transaction.type === 'buy'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                                }`}
                        >
                            {transaction.type === 'buy' ? '🟢' : '🔴'} {transaction.type.toUpperCase()} {transaction.ticker} {transaction.amount.toLocaleString()}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
