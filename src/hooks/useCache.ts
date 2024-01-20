import { useRef, useCallback } from 'react';

type CacheData = Record<string, { data: any; timestamp: number }>;

function useCache(timeout: number = 5000) {
    const cache = useRef<CacheData>({}).current;

    const setItem = useCallback((key: string, data: any) => {
        const cachedItem = { data, timestamp: Date.now() };
        cache[key] = cachedItem;
    }, []);

    const getItem = useCallback((key: string): any | null => {
        const cachedItem = cache[key];
        if (!cachedItem) return null;

        const isExpired = Date.now() - cachedItem.timestamp > timeout;
        return isExpired ? null : cachedItem.data;
    }, [timeout]);

    return { setItem, getItem };
}

export default useCache;
