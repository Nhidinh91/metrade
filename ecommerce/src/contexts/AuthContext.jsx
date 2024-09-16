import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext({
    user: null,
    updateUser: () => { },
    deleteUser: () => { },
    setUser: () => { },
    isAuthenticated: () => false,
    isLoading: true,
    updateUser: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const { getItem, setItem } = useLocalStorage("user");

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            setUser(user);
        }
        setIsLoading(false);
    }, [getItem, setUser]);

    const updateUser = (user) => {
        setUser(user);
        setItem("user", user);
    }

    const deleteUser = () => {
        setUser(null);
        setItem("user", null);
    }

    const isAuthenticated = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider value={{ user, updateUser, deleteUser, setUser, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};