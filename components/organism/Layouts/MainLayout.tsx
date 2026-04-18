import React from 'react';
import Footer from '../Footer';
import Copyrights from '../Copyrights';
import NewsletterSignup from '../../molecules/NewsletterSignup';
import { ToastContainer } from 'react-toastify';
import { FloatingNav } from '../FloatingNavbar';
import FloatingButton from '../FloatingButton';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FloatingNav />
      {children}
      <NewsletterSignup />
      <Footer />
      <Copyrights />
      <ToastContainer />
      <FloatingButton />
    </>
  );
};

export default MainLayout;
