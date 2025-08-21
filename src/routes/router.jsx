
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



import AuthLayout from '@/layout/AuthLayout';
import Layout from '@/layout/layout';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Home from '@/pages/main/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
     {
         path: '/',
         element: <AuthLayout />,
         children: [
           {
             path: '/sign-in',
             element: <SignIn />,
           },
           {
             path: '/sign-up',
             element: <SignUp />,
           },
           {
             path: '/forgot-password',
             element: <ForgotPassword />,
           },
         ],
       },
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
