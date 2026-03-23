import { FETURES } from '@/data';
import { FocusCards } from '../ui/focus-cards';
import ResponsiveWrapper from '../molecules/ResponsiveWrapper';

const FeatursSec = () => {
  return (
    <ResponsiveWrapper otherClassName="pb-8!">
      <FocusCards cards={FETURES} />
    </ResponsiveWrapper>
  );
};

export default FeatursSec;
