import React from 'react';
import Footer from './Footer';
import Copyrights from './Copyrights';
import NewsletterSignup from '../molecules/NewsletterSignup';
import { ToastContainer } from 'react-toastify';
import { FloatingNav } from './FloatingNavbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FloatingNav />
      {children}
      <NewsletterSignup />
      <Footer />
      <Copyrights />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
