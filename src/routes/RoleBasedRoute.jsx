// src/routes/RoleBasedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { userRole, isLoading } = useUser(); // Example: 'manager' or 'technician'

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

    if (!allowedRoles.includes(userRole?.toLowerCase())) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
