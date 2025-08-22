
import Footer from '@/shared/footer/Footer';
import Navbar from '@/shared/navbar/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
