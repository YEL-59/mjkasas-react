// // src/routes/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// const ProtectedRoute = () => {
//     const { userInfo } = useUser();
//     const token = localStorage.getItem("token");

//     // If no token → redirect to login
//     if (!token) {
//         return <Navigate to="/auth/sign-in" replace />;
//     }

//     // Otherwise, allow access
//     return <Outlet />;
// };

// export default ProtectedRoute;


// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const ProtectedRoute = () => {
    const { isLoading } = useUser();
    const token = localStorage.getItem("token");

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

