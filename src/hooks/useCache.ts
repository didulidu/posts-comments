import { useState, useCallback } from 'react';
type CacheData = Record<string, { data: any; timestamp: number }>;

function useCache(timeout: number = 5000) {
    const [cache, setCache] = useState<CacheData>({});

    const setItem = useCallback((key: string, data: any) => {
        const cachedItem = { data, timestamp: Date.now() };
        setCache(prevCache => ({ ...prevCache, [key]: cachedItem }));
    }, []);

    const getItem = useCallback((key: string): any | null => {
        const cachedItem = cache[key];
        if (!cachedItem) return null;

        const isExpired = Date.now() - cachedItem.timestamp > timeout;
        return isExpired ? null : cachedItem.data;
    }, [cache, timeout]);

    return { setItem, getItem };
}

export default useCache;
