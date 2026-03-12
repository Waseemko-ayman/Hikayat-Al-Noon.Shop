"use client"
import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';

const Visit = dynamic(() => import('./Sections/Visit'), { ssr: false });
const LeaveMessage = dynamic(() => import('./Sections/LeaveMessage'), {
  ssr: false,
});

const ContactPage = () => {
  return (
    <>
      <RepairServices />
      <Visit />
      <LeaveMessage />
    </>
  );
};

export default ContactPage;
