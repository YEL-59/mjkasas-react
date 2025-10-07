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

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // or get from context

    if (!token) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

