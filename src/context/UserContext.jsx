import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState('manager'); // Default role
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Manager'
    });

    const login = (role, userData) => {
        setUserRole(role);
        setUserInfo(userData);
    };

    const logout = () => {
        setUserRole('manager');
        setUserInfo({
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Manager'
        });
        // Navigate to login page
        window.location.href = '/auth/sign-in';
    };

    const value = {
        userRole,
        userInfo,
        login,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
