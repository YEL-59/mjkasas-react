
import AuthLayout from '@/layout/AuthLayout';
import UnifiedLayout from '@/layout/UnifiedLayout';
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
import TechnicianWorkOrder from '@/pages/TechnicianDashboard/workorder';
import TechnicianCompletedOrders from '@/pages/TechnicianDashboard/CompletedOrders';
import TechnicianInspection from '@/pages/TechnicianDashboard/Inspection';
import TechnicianSettings from '@/pages/TechnicianDashboard/Settings';
import NotFound from '@/components/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import CompleteOrder from '@/pages/ManagerDashboard/complete-order';
import CompleteOrderDetailsPage from '@/pages/ManagerDashboard/complete-order/CompleteOrderDetailsPage';
import BuildingOrder from '@/pages/ManagerDashboard/building-order';
import AddBuilding from '@/pages/ManagerDashboard/building-order/AddBuilding';
import Employee from '@/pages/ManagerDashboard/emplyee';
import Inspection from '@/pages/ManagerDashboard/insfictions';
import InspectionDetailsPage from '@/pages/ManagerDashboard/insfictions/InspectionDetailsPage';
import CreateInspection from '@/pages/ManagerDashboard/insfictions/CreateInspection';
import Settings from '@/pages/ManagerDashboard/settings';

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
    element: <UnifiedLayout />,
    children: [
      {
        index: true,
        element: <ManagerHome />,
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
        element: <CompleteOrder />,
      },
      {
        path: 'completed-orders/:id',
        element: <CompleteOrderDetailsPage />,
      },
      {
        path: 'buildings',
        element: <BuildingOrder />,
      },
      {
        path: 'buildings/add',
        element: <AddBuilding />,
      },
      {
        path: 'employees',
        element: <Employee />,
      },
      {
        path: 'inspection',
        element: <Inspection />,
      },
      {
        path: 'inspection/create',
        element: <CreateInspection />,
      },
      {
        path: 'inspection/:id',
        element: <InspectionDetailsPage />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },

  // Technician Dashboard Routes
  {
    path: '/technician',
    element: <UnifiedLayout />,
    children: [
      {
        index: true,
        element: <TechnicianHome />,
      },
      {
        path: 'work-order',
        element: <TechnicianWorkOrder />,
      },
      {
        path: 'completed-orders',
        element: <TechnicianCompletedOrders />,
      },
      {
        path: 'inspection',
        element: <TechnicianInspection />,
      },
      {
        path: 'settings',
        element: <TechnicianSettings />,
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
