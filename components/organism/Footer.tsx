'use client';
import Image from 'next/image';
import Container from '../atoms/Container';
import Layer from '../atoms/Layer';
import FooterLinks from '../molecules/FooterLinks';
import { motion } from 'framer-motion';

const MotionImage = motion(Image);

const Footer = () => {
  return (
    <Layer otherClassName="overflow-hidden pb-5">
      <footer>
        <Container otherClassName="flex items-start md:items-center justify-between flex-col md:flex-row flex-wrap gap-5">
          <div className="md:mr-10 max-md:mx-auto">
            <MotionImage
              src="/assets/landing/noon-logo.webp"
              alt="Hikayat Al-Noon"
              title="Hikayat Al-Noon"
              className="mb-8 w-auto h-auto"
              width={130}
              height={40}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex justify-between gap-5 flex-wrap flex-1">
            <FooterLinks
              secTitle="Contact"
              listName="Contact"
              otherClassName="w-[250px]"
            />
            <FooterLinks
              secTitle="About"
              listName="About"
              otherClassName="w-[150px]"
            />
            <FooterLinks
              secTitle="My Account"
              listName="myAccount"
              otherClassName="w-[150px]"
            />
            <FooterLinks
              secTitle="Follow Us"
              listClassName="flex items-center gap-2.5"
              listName="followUs"
            />
          </div>
        </Container>
      </footer>
    </Layer>
  );
};

export default Footer;
