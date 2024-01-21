/**
 * @jest-environment jsdom
 */
import React, { renderHook, act } from '@testing-library/react';
import useDebounce from '../hooks/useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('updates the debounced value after the specified delay', () => {
        const initialValue = 'test';
        const delay = 500;

        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: initialValue, delay } }
        );

        expect(result.current).toBe(initialValue);

        const updatedValue = 'test-2';
        rerender({ value: updatedValue, delay });

        act(() => {
            jest.advanceTimersByTime(delay - 200);
        });

        expect(result.current).toBe(initialValue);
        act(() => {
            jest.advanceTimersByTime(200);
        });
        expect(result.current).toBe(updatedValue);

    });
});
