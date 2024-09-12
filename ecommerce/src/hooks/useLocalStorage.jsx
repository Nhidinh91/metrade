import { useState, useCallback } from "react";

export const useLocalStorage = (key, initialValue = null) => {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    const setItem = useCallback((key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }, []);

    const getItem = useCallback((key) => {

        const item = localStorage.getItem(key);
        const parsedItem = item ? JSON.parse(item) : null;
        setValue(parsedItem);

        return parsedItem;
    }, []);

    const removeItem = useCallback((key) => {
        localStorage.removeItem(key);
        setValue(null);
    }, []);

    return { value, setItem, getItem, removeItem };
};