import { FETURES } from '@/data';
import { FocusCards } from '../ui/focus-cards';
import ResponsiveWrapper from '../molecules/ResponsiveWrapper';

const FeatursSec = () => {
  return (
    <ResponsiveWrapper otherClassName="pt-0! pb-8!">
      <FocusCards cards={FETURES} />
    </ResponsiveWrapper>
  );
};

export default FeatursSec;
