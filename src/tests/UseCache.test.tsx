import { renderHook, act } from '@testing-library/react';
import useCache from '../hooks/useCache';

describe('useCache', () => {
    test('allows setting and getting a cached item', () => {
        const { result } = renderHook(() => useCache());

        act(() => {
            result.current.setItem('testKey', 'testValue');
        });

        expect(result.current.getItem('testKey')).toBe('testValue');
    });

    test('returns null for expired items', () => {
        const dateNowSpy = jest.spyOn(Date, 'now');
        dateNowSpy.mockImplementation(() => 100000);

        const { result } = renderHook(() => useCache(1000));

        act(() => {
            result.current.setItem('testKey', 'testValue');
            dateNowSpy.mockImplementation(() => 101500);
        });

        expect(result.current.getItem('testKey')).toBeNull();

        dateNowSpy.mockRestore();
    });
    test('returns null for non-existent keys', () => {
        const { result } = renderHook(() => useCache());

        expect(result.current.getItem('nonExistentKey')).toBeNull();
    });

});
