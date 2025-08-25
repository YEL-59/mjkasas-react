
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
import TechnicianHome from '@/pages/TechnicianDashboard/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  // Auth Routes
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
    path: '/manager',
    element: <DashboardLayout userType="manager" />,
    children: [
      {
        index: true,
        element: <ManagerHome />,
      },
      {
        path: 'create-work-order',
        element: <CreateWorkOrder />,
      },
      // Add more manager routes here
      // {
      //   path: 'work-orders',
      //   element: <ManagerWorkOrders />,
      // },
      // {
      //   path: 'employees',
      //   element: <ManagerEmployees />,
      // },
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
      // Add more technician routes here
      // {
      //   path: 'my-tasks',
      //   element: <TechnicianTasks />,
      // },
      // {
      //   path: 'schedule',
      //   element: <TechnicianSchedule />,
      // },
    ],
  },

  // Default redirect to manager dashboard
  {
    path: '/',
    element: <ManagerHome />,
  },
]);

export default router;
