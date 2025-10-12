'use client';

import { useEffect, useState } from 'react';

interface PumpFunEvent {
    type: string;
    data: {
        txType: string;
        tokenAmount: number;
        mint: string;
    };
    timestamp: number;
}

interface TradeNotificationProps {
    events: PumpFunEvent[];
    tokenType: 'local' | 'visitant';
    tokenAddress?: string;
}

export default function TradeNotification({ events, tokenType, tokenAddress }: TradeNotificationProps) {
    const [visibleNotifications, setVisibleNotifications] = useState<Array<{
        id: string;
        position: { x: number; y: number };
        txType?: string;
        tokenAmount?: number;
    }>>([]);

    useEffect(() => {
        if (!tokenAddress) return;

        // Filtrar eventos recientes (últimos 5 segundos) y que coincidan con la dirección del token
        const recentEvents = events.filter(event => {
            const isRecent = Date.now() - event.timestamp < 5000;
            const isForThisToken = event.data.mint === tokenAddress;
            return isRecent && isForThisToken;
        });

        console.log(`🔍 ${tokenType} token (${tokenAddress.slice(0, 8)}...): Found ${recentEvents.length} recent events`);

        if (recentEvents.length > 0) {
            console.log(`📊 Recent events for ${tokenType}:`, recentEvents.map(e => ({
                mint: e.data.mint.slice(0, 8) + '...',
                txType: e.data.txType,
                tokenAmount: e.data.tokenAmount
            })));
        }

        // Limitar a máximo 3 notificaciones simultáneas por token
        const limitedEvents = recentEvents.slice(0, 3);

        limitedEvents.forEach((event, index) => {
            // Generar posición más específica para evitar superposición
            const baseX = tokenType === 'local' ? 50 : 350; // Posición base
            const offsetX = (index % 3) * 30; // Offset para evitar superposición
            const randomOffset = Math.random() * 20; // Pequeño offset aleatorio

            const position = {
                x: baseX + offsetX + randomOffset,
                y: 100 + (index % 2) * 80 + Math.random() * 40, // Posición Y escalonada
            };

            const id = `${tokenType}-${event.timestamp}-${index}`;

            console.log(`🎯 Showing notification for ${tokenType} token:`, {
                txType: event.data.txType,
                tokenAmount: event.data.tokenAmount,
                position,
                baseX,
                offsetX,
                index
            });

            setVisibleNotifications(prev => [
                ...prev,
                {
                    id,
                    position,
                    txType: event.data.txType,
                    tokenAmount: event.data.tokenAmount
                }
            ]);

            // Remover después de 3 segundos
            setTimeout(() => {
                setVisibleNotifications(prev =>
                    prev.filter(n => n.id !== id)
                );
            }, 3000);
        });
    }, [events, tokenType, tokenAddress]);

    if (visibleNotifications.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-20">
            {visibleNotifications.map(notification => (
                <div
                    key={notification.id}
                    className="absolute animate-bounce"
                    style={{
                        left: notification.position.x,
                        top: notification.position.y,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white animate-pulse">
                        {notification.txType === 'buy' ? '🟢' : '🔴'} {notification.txType}
                        {notification.tokenAmount && (
                            <div className="text-xs">
                                {notification.tokenAmount.toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
