// import { createBrowserRouter } from 'react-router-dom';

// import DashboardLayout from './../layout/DashboardLayout';
// import Alumni from '../pages/admin/Alumni';
// import Impression from '../pages/admin/Impression';
// import Message from '../pages/admin/Message';
// import Scheduled from '../pages/admin/Scheduled';
// import DashboardHome from '../pages/admin/DashboardHome';
// import SignIn from '../pages/auth/SignIn';
// import AuthLayout from '../layout/AuthLayout';
// import NotFound from '@/pages/admin/NotFound';
// import AiNudges from '@/pages/admin/AiNudges';
// import RiskAlerts from '@/pages/admin/RiskAlerts';
// import Students from '@/pages/admin/Students';
// import StudentProfile from '@/pages/admin/StudentProfile';
// import SignUp from '@/pages/auth/SignUp';
// import ForgotPassword from '@/pages/auth/ForgotPassword';
// import EmployerDashboard from '@/layout/EmployerDashboard';
// import Messages from '@/pages/employer/Messages';
// import AllApplicants from '@/pages/employer/AllApplicants';
// import JobListing from '@/pages/employer/JobListing';
// import Talentful from '@/pages/employer/Talentful';
// import Calendar from '@/pages/employer/Calendar';
// import EmployerHome from '@/pages/employer/EmployerHome';
// import ApplicantProfile from '@/pages/employer/ApplicantProfile';
// import CreateJob from '@/pages/employer/CreateJob';
// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <AuthLayout />,
//         children: [
//           {
//             path: '/sign-in',
//             element: <SignIn />,
//           },
//           {
//             path: '/sign-up',
//             element: <SignUp />,
//           },
//           {
//             path: '/forgot-password',
//             element: <ForgotPassword />,
//           },
//         ],
//       },
    
//       //Admin Dashboard layout
//       {
//         path: '/',
//         element: <DashboardLayout />,
//         children: [
//           {
//             index: true,
//             element: <DashboardHome />,
//           },
//           {
//             path: 'students',
//             element: <Students />,
//           },
//           {
//             path: 'alumni',
//             element: <Alumni />,
//           },
//           {
//             path: 'impression',
//             element: <Impression />,
//           },
//           {
//             path: 'message',
//             element: <Message />,
//           },
//           {
//             path: 'ai-nudges',
//             element: <AiNudges />,
//           },
//           {
//             path: 'risk-alerts',
//             element: <RiskAlerts />,
//           },
//           {
//             path: 'scheduled',
//             element: <Scheduled />,
//           },
//           {
//             path: '/students/:id',
//             element: <StudentProfile />,
//           },
    
//           // if page now found
//           {
//             path: '*',
//             element: <NotFound />,
//           },
//         ],
//       },
    
//       //Admin Dashboard layout
//       {
//         path: '/employer-dashboard',
//         element: <EmployerDashboard />,
//         children: [
//           {
//             index: true,
//             element: <EmployerHome />,
//           },
//           {
//             path: 'messages',
//             element: <Messages />,
//           },
//           {
//             path: 'all-applicants',
//             element: <AllApplicants />,
//           },
//           {
//             path: 'job-listing',
//             element: <JobListing />,
//           },
//           {
//             path: 'talentful',
//             element: <Talentful />,
//           },
//           {
//             path: 'calendar',
//             element: <Calendar />,
//           },
//           {
//             path: 'applicant-profile/:id',
//             element: <ApplicantProfile />,
//           },
//           {
//             path: 'job-listing/create-job',
//             element: <CreateJob />,
//           },
    
//           // if page now found
//           {
//             path: '*',
//             element: <NotFound />,
//           },
//         ],
//       },
// ]);

// export default router;



import Layout from '@/layout/layout';
import Home from '@/pages/main/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
