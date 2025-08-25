
import AuthLayout from '@/layout/AuthLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import OtpVerification from '@/pages/Auth/OtpVerification';
import SetPassword from '@/pages/Auth/SetPassword';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Success from '@/pages/Auth/Success';
import ManagerHome from '@/pages/ManagerDashboard/home';
import CreateWorkOrder from '@/pages/ManagerDashboard/CreateWorkOrder';
import WorkOrder from '@/pages/ManagerDashboard/work-order';
import WorkOrderDetailsPage from '@/pages/ManagerDashboard/work-order/WorkOrderDetailsPage';
import TechnicianHome from '@/pages/TechnicianDashboard/Home';
import NotFound from '@/components/NotFound';
import { createBrowserRouter } from 'react-router-dom';

// ============================================================================
// MAIN ROUTER CONFIGURATION
// ============================================================================

const router = createBrowserRouter([
  // Authentication Routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'set-password',
        element: <SetPassword />,
      },
      {
        path: 'otp-verification',
        element: <OtpVerification />,
      },
      {
        path: 'success',
        element: <Success />,
      },
    ],
  },

  // Manager Dashboard Routes
  {
    path: '/',
    element: <DashboardLayout userType="manager" />,
    children: [
      {
        index: true,
        element: <ManagerHome />,
      },
      {
        path: 'manager',
        element: <ManagerHome />,
      },
      {
        path: 'manager/create-work-order',
        element: <CreateWorkOrder />,
      },
      {
        path: 'work-order',
        element: <WorkOrder />,
      },
      {
        path: 'work-order/:id',
        element: <WorkOrderDetailsPage />,
      },
      {
        path: 'completed-orders',
        element: <NotFound />,
      },
      {
        path: 'buildings',
        element: <NotFound />,
      },
      {
        path: 'employees',
        element: <NotFound />,
      },
      {
        path: 'inspection',
        element: <NotFound />,
      },
      {
        path: 'settings',
        element: <NotFound />,
      },
    ],
  },

  // Technician Dashboard Routes
  {
    path: '/technician',
    element: <DashboardLayout userType="technician" />,
    children: [
      {
        index: true,
        element: <TechnicianHome />,
      },
    ],
  },

  // 404 Not Found Route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
