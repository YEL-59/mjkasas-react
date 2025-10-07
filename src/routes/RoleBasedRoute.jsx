// src/routes/RoleBasedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { userRole } = useUser(); // Example: 'manager' or 'technician'

    if (!allowedRoles.includes(userRole?.toLowerCase())) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
