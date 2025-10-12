'use client';

import { useEffect, useRef, useState } from 'react';

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

export function usePumpFunWebSocket(tokenAddresses: string[] = []) {
    const wsRef = useRef<WebSocket | null>(null);
    const isConnectedRef = useRef(false);
    const hasSent40Ref = useRef(false);
    const hasSent3Ref = useRef(false);
    const [events, setEvents] = useState<TradeEvent[]>([]);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isConnectingRef = useRef(false);

    useEffect(() => {
        const connectWebSocket = () => {
            if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
                console.log('⏳ Already connecting or connected, skipping...');
                return;
            }

            isConnectingRef.current = true;
            console.log('🔌 Attempting to connect to Pump.fun WebSocket...');

            try {
                const ws = new WebSocket('wss://frontend-api-v3.pump.fun/socket.io/?EIO=4&transport=websocket');
                wsRef.current = ws;

                ws.onopen = function open() {
                    console.log('✅ Connected to Pump.fun WebSocket');
                    isConnectedRef.current = true;
                    isConnectingRef.current = false;
                    hasSent40Ref.current = false;
                    hasSent3Ref.current = false;
                };

                ws.onmessage = function message(data) {
                    const messageStr = data.data.toString();

                    // Si incluye 0, entonces mandar 40
                    if (messageStr[0] === '0' && messageStr.includes('"sid"')) {
                        ws.send('40');
                        hasSent40Ref.current = true;
                    }

                    // Si incluye 2, entonces mandar 3
                    if (messageStr.includes('2') && messageStr.length === 1) {
                        ws.send('3');
                        hasSent3Ref.current = true;
                    }

                    // Procesar eventos de trade
                    if (messageStr.startsWith('42')) {
                        try {
                            const eventData = JSON.parse(messageStr.substring(2));

                            if (eventData[0] === 'tradeCreated') {
                                const tradeData: TradeEvent = eventData[1];

                                // Solo logear y procesar si es de nuestros tokens
                                if (tokenAddresses.includes(tradeData.mint)) {
                                    console.log('🔥 TRADE CREATED:', {
                                        signature: tradeData.signature,
                                        mint: tradeData.mint,
                                        is_buy: tradeData.is_buy,
                                        token_amount: tradeData.token_amount,
                                        sol_amount: tradeData.sol_amount,
                                        name: tradeData.name,
                                        symbol: tradeData.symbol
                                    });
                                    setEvents(prev => [...prev, tradeData]);
                                }
                            }
                        } catch (error) {
                            // Silently handle parsing errors
                        }
                    }
                };

                ws.onerror = function error(err) {
                    console.error('❌ Pump.fun WebSocket error:', err);
                    isConnectingRef.current = false;
                };

                ws.onclose = function close(event) {
                    console.log('🔌 Disconnected from Pump.fun WebSocket. Code:', event.code, 'Reason:', event.reason);
                    isConnectedRef.current = false;
                    isConnectingRef.current = false;

                    // Intentar reconectar después de 5 segundos si no fue un cierre intencional
                    if (event.code !== 1000) { // 1000 = cierre normal
                        console.log('🔄 Scheduling reconnection in 5 seconds...');
                        reconnectTimeoutRef.current = setTimeout(() => {
                            if (tokenAddresses.length > 0) {
                                connectWebSocket();
                            }
                        }, 5000);
                    }
                };

            } catch (error) {
                console.error('❌ Error creating Pump.fun WebSocket:', error);
                isConnectingRef.current = false;
            }
        };

        // Limpiar timeout anterior si existe
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        connectWebSocket();

        return () => {
            console.log('🧹 Cleaning up Pump.fun WebSocket...');
            isConnectingRef.current = false;

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }

            if (wsRef.current) {
                wsRef.current.close(1000, 'Component unmounting');
                wsRef.current = null;
            }
        };
    }, []); // Solo ejecutar una vez al montar

    // Los tokenAddresses se usan en el onmessage, no necesitamos reconectar
    // console.log('📝 Token addresses updated:', tokenAddresses);

    return { isConnected: isConnectedRef.current, events };
}