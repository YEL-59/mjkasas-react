import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    // Default state is empty
    const [userRole, setUserRole] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore user from localStorage if exists
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        // If no token, clear everything
        if (!token) {
            setUserRole(null);
            setUserInfo(null);
            localStorage.removeItem("user");
            setIsLoading(false);
            return;
        }

        try {
            if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
                const parsed = JSON.parse(savedUser);
                if (parsed?.role) setUserRole(parsed.role);
                if (parsed) setUserInfo(parsed);
            }
        } catch (error) {
            console.error("Failed to parse saved user:", error);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUserRole(null);
            setUserInfo(null);
        } finally {
            setIsLoading(false);
        }
    }, []);


    // Login function
    const login = (role, userData) => {
        setUserRole(role);
        setUserInfo(userData);
        localStorage.setItem("user", JSON.stringify({ role, ...userData }));
    };

    // Logout function
    const logout = () => {
        setUserRole(null);
        setUserInfo(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/auth/sign-in"; // safe outside router
    };

    const value = {
        userRole,
        userInfo,
        isLoading,
        login,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
