'use client';
import Image from 'next/image';
import Container from '../atoms/Container';
import Layer from '../atoms/Layer';
import FooterLinks from '../molecules/FooterLinks';
import Link from 'next/link';
import { APP_STORE, CONTACT_INFO } from '@/data';
import { motion } from 'framer-motion';
import Contactnformation from '../atoms/ContactInformation';
import SecondaryHeading from '../atoms/SecondaryHeading';

const MotionImage = motion(Image);

const Footer = () => {
  return (
    <Layer otherClassName="overflow-hidden pb-5">
      <footer>
        <Container otherClassName="flex items-start md:items-center justify-between flex-col md:flex-row flex-wrap gap-5">
          <div className="md:mr-20">
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
            <SecondaryHeading title="Contact" />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              {CONTACT_INFO.map((item) => (
                <Contactnformation
                  key={item.id}
                  title={item.title}
                  info={item.info}
                />
              ))}
            </motion.div>
            <FooterLinks
              secTitle="Follow Us"
              listClassName="flex items-center gap-2.5"
              listName="followUs"
            />
          </div>
          <div className="flex justify-between gap-5 flex-wrap flex-1">
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
            <div>
              <SecondaryHeading title="Install App" />
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-(--seconde-color) text-base mt-[15px] mb-5"
              >
                From App Store or Google Play
              </motion.p>
              <div className="flex items-center justify-start flex-wrap gap-1.5">
                {APP_STORE.map(({ id, imgSrc, imgAlt, url }, index) => (
                  <motion.a
                    key={id}
                    href={url}
                    className="border border-(--forth-color) rounded-[6px] px-1 hover:shadow-[10px_10px_34px_#08817917] transition duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Image src={imgSrc} alt={imgAlt} width={170} height={48} />
                  </motion.a>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-(--seconde-color) text-base mt-[15px] mb-5"
              >
                Secured Payment Gateays
              </motion.p>
              <Link href="#">
                <MotionImage
                  src="/assets/pay/pay.png"
                  alt="pay"
                  width={224}
                  height={32}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true, amount: 0.2 }}
                />
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </Layer>
  );
};

export default Footer;
