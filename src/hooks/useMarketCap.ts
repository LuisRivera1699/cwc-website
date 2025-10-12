'use client';

import { useState, useEffect } from 'react';

interface MarketCapData {
    usd_market_cap: number;
    [key: string]: any;
}

export function useMarketCap(contractAddress: string | undefined) {
    const [marketCap, setMarketCap] = useState<number | null>(null);

    useEffect(() => {
        if (!contractAddress) {
            setMarketCap(null);
            return;
        }

        const fetchMarketCap = async () => {
            try {
                const response = await fetch(`https://frontend-api-v3.pump.fun/coins/${contractAddress}`);

                if (!response.ok) {
                    return; // Mantener el último valor
                }

                const data: MarketCapData = await response.json();

                if (data.usd_market_cap !== undefined) {
                    setMarketCap(data.usd_market_cap);
                }
                // Mantener el último valor si no hay datos
            } catch (err) {
                // Mantener el último valor, no actualizar el estado
            }
        };

        // Llamada inicial
        fetchMarketCap();

        // Llamada cada 2 segundos
        const interval = setInterval(fetchMarketCap, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [contractAddress]);

    return { marketCap };
}
