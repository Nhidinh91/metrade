import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext({
  user: null,
  updateUser: () => {},
  deleteUser: () => {},
  setUser: () => {},
  isAuthenticated: () => false,
  isLoading: true,
  renewAccessToken: () => {},
  scheduleTokenRenewal: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getItem, setItem } = useLocalStorage("user");

  const logout = async () => {
    try {
      // Call the backend logout API to clear the refresh token from the database and cookies
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        // If the logout API is successful, clear the user state and localStorage
        setUser(null);
        setItem(null);
      } else {
        console.error("Failed to log out on the server.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  //function to renew access token
  const renewAccessToken = async () => {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        await logout(); // Log the user out if token renewal fails
        return;
      }
      //if renew successfully
      const expiresAt = await response.json().token_expired_at;
      const updatedUser = { ...user, token_expired_at: expiresAt };
      setUser(updatedUser);
      setItem(updatedUser);
      scheduleTokenRenewal(expiresAt);
    } catch (error) {
      console.error("Error renewing access token:", error);
      await logout(); // Log the user out if an error occurs
    }
  };

  //function to set schedule for access token renewal
  const scheduleTokenRenewal = (expiresAt) => {
    const currentTime = Date.now();
    const tokenExpiresAt = expiresAt || user?.token_expired_at;

    if (tokenExpiresAt) {
      const timeToRenew = tokenExpiresAt - currentTime - 5 * 60 * 1000;
      if (timeToRenew > 0) {
        setTimeout(() => {
          renewAccessToken();
        }, timeToRenew);
      }
    }
  };

  useEffect(() => {
    const storedUser = getItem(); // Get user from localStorage
    if (storedUser) {
      setUser(storedUser);
      scheduleTokenRenewal(storedUser.token_expired_at);
    setIsLoading(false);
  }}, [getItem]);

  const updateUser = (user) => {
    setUser(user);
    setItem(user);
    scheduleTokenRenewal(user.token_expired_at); // Schedule token renewal when the user logs in or update user info
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        logout,
        setUser,
        isAuthenticated,
        isLoading,
        renewAccessToken,
        scheduleTokenRenewal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
