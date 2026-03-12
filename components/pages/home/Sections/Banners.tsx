import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import Banner from '@/components/molecules/Banner';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { BANNERS_DATA } from '@/data';

const Banners = () => {
  return (
    <Layer>
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          {BANNERS_DATA.filter((item) => item.type === 'big').map(
            (item, index) => (
              <AnimatedWrapper key={item.id} custom={index}>
                <Banner
                  key={item.id}
                  height="h-[50vh]"
                  otherClassNameContainer={
                    index === 0 ? 'bg-right' : 'bg-center'
                  }
                  {...item}
                />
              </AnimatedWrapper>
            ),
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {BANNERS_DATA.filter((item) => item.type === 'small').map(
            (item, index) => (
              <AnimatedWrapper key={item.id} custom={index}>
                <Banner
                  key={item.id}
                  height="h-[35vh]"
                  otherClassNameContainer={
                    item.id === 3 || item.id === 4
                      ? 'justify-end'
                      : item.id === 5
                        ? 'justify-start'
                        : undefined
                  }
                  {...item}
                />
              </AnimatedWrapper>
            ),
          )}
        </div>
      </Container>
    </Layer>
  );
};

export default Banners;
