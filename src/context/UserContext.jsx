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

    // Restore user from localStorage if exists
    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        try {
            if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
                const parsed = JSON.parse(savedUser);
                if (parsed?.role) setUserRole(parsed.role);
                if (parsed) setUserInfo(parsed);
            }
        } catch (error) {
            console.error("Failed to parse saved user:", error);
            localStorage.removeItem("user"); // Clean up broken data
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
        window.location.href = "/auth/sign-in"; // safe outside router
    };

    const value = {
        userRole,
        userInfo,
        login,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
