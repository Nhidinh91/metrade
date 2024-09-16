import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext({
    user: null,
    signIn: () => { },
    signOut: () => { },
    setUser: () => { },
    isAuthenticated: () => false,
    isLoading: true
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

    const signIn = (user) => {
        setUser(user);
        setItem("user", user);
    }

    const signOut = () => {
        setUser(null);
        setItem("user", null);
    }

    const isAuthenticated = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, setUser, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};