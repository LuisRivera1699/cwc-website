'use client';

import { useState, useEffect, useRef } from 'react';

interface PumpFunEvent {
    type: string;
    data: any;
    timestamp: number;
}

export function usePumpFunEvents(tokenAddresses: string[]) {
    const [events, setEvents] = useState<PumpFunEvent[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isConnectingRef = useRef(false);
    const lastConnectionAttemptRef = useRef<number>(0);

    useEffect(() => {
        if (tokenAddresses.length === 0) {
            console.log('🚫 No token addresses provided, skipping WebSocket connection');
            return;
        }

        // Evitar múltiples conexiones simultáneas
        if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.CONNECTING || wsRef.current?.readyState === WebSocket.OPEN) {
            console.log('⏳ Already connecting or connected, skipping...');
            return;
        }

        // Debounce: evitar conexiones muy rápidas
        const now = Date.now();
        if (now - lastConnectionAttemptRef.current < 2000) {
            console.log('⏳ Too soon since last connection attempt, skipping...');
            return;
        }
        lastConnectionAttemptRef.current = now;

        const connectWebSocket = () => {
            if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.CONNECTING || wsRef.current?.readyState === WebSocket.OPEN) {
                console.log('⏳ WebSocket already connecting or connected, skipping...');
                return;
            }

            isConnectingRef.current = true;
            console.log('🔌 Attempting to connect to Pump.fun WebSocket...');

            try {
                const ws = new WebSocket('wss://pumpportal.fun/api/data');
                wsRef.current = ws;

                ws.onopen = function open() {
                    setIsConnected(true);
                    setConnectionError(null);
                    isConnectingRef.current = false;

                    // Suscribirse a trades de tokens específicos
                    const payload = {
                        method: "subscribeTokenTrade",
                        keys: tokenAddresses
                    };

                    ws.send(JSON.stringify(payload));
                };

                ws.onmessage = function message(data) {
                    try {
                        let eventData;

                        // Si ya es un objeto, usarlo directamente
                        if (typeof data === 'object' && data !== null) {
                            eventData = data;
                        } else {
                            // Si es string, parsearlo
                            const rawData = data.toString();
                            eventData = JSON.parse(rawData);
                        }

                        // Verificar si tiene los campos que nos interesan directamente
                        if (eventData.txType && eventData.tokenAmount !== undefined) {
                            // Extraer solo los campos que nos interesan
                            const { txType, tokenAmount, mint } = eventData;

                            // Agregar timestamp
                            const event: PumpFunEvent = {
                                type: 'tokenTrade',
                                data: {
                                    txType,
                                    tokenAmount,
                                    mint
                                },
                                timestamp: Date.now()
                            };

                            setEvents(prev => [...prev, event]);
                        } else if (eventData.data && typeof eventData.data === 'string') {
                            // Si los datos están en un campo 'data' como string JSON
                            try {
                                const nestedData = JSON.parse(eventData.data);

                                if (nestedData.txType && nestedData.tokenAmount !== undefined) {
                                    const { txType, tokenAmount, mint } = nestedData;

                                    // Agregar timestamp
                                    const event: PumpFunEvent = {
                                        type: 'tokenTrade',
                                        data: {
                                            txType,
                                            tokenAmount,
                                            mint
                                        },
                                        timestamp: Date.now()
                                    };

                                    setEvents(prev => [...prev, event]);
                                }
                            } catch (nestedError) {
                                // Silently handle nested parsing errors
                            }
                        }
                    } catch (error) {
                        // Silently handle parsing errors
                    }
                };

                ws.onerror = function error(err) {
                    setConnectionError('WebSocket connection error');
                    isConnectingRef.current = false;
                };

                ws.onclose = function close(event) {
                    setIsConnected(false);
                    isConnectingRef.current = false;

                    // Intentar reconectar después de 5 segundos si no fue un cierre intencional
                    if (event.code !== 1000) { // 1000 = cierre normal
                        reconnectTimeoutRef.current = setTimeout(() => {
                            if (tokenAddresses.length > 0) {
                                connectWebSocket();
                            }
                        }, 5000);
                    }
                };

            } catch (error) {
                setConnectionError('Failed to create WebSocket connection');
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
    }, [tokenAddresses]);

    // Limpiar eventos antiguos para evitar acumulación de memoria
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            setEvents(prev => {
                // Mantener solo eventos de los últimos 5 minutos
                const filtered = prev.filter(event => now - event.timestamp < 300000);
                return filtered;
            });
        }, 30000); // Limpiar cada 30 segundos

        return () => clearInterval(cleanupInterval);
    }, []);

    return { events, isConnected, connectionError };
}
