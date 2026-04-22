/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const MotionFade = ({ children, y, className }: any) => {
  const fadeUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    }),
    [],
  );

  // helper function to apply motion props with dynamic y values
  const getMotionProps = (y?: any) => ({
    ...(y && { style: { y } }),
    ...fadeUp,
  });

  return (
    <motion.div {...getMotionProps(y)} className={className}>
      {children}
    </motion.div>
  );
};

export default MotionFade;
