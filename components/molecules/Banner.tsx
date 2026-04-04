import Button from '../atoms/Button';
import { WobbleCard } from '../ui/wobble-card';
import { BannerProps } from '@/interfaces';

const Banner = ({
  height,
  bgImage,
  subTitle,
  title,
  description,
  btnText,
  overlay,
  type = 'big',
  otherClassNameContainer,
  handleClick,
}: BannerProps) => {
  const renderTitle = () =>
    type === 'big' ? (
      <>
        <h3 className="text-xl font-light">{subTitle}</h3>
        <h2 className="text-3xl font-extrabold">{title}</h2>
      </>
    ) : (
      <>
        <h3 className="text-xl font-extrabold uppercase">{subTitle}</h3>
        <h4 className="text-sm font-bold text-red-500">{title}</h4>
      </>
    );

  return (
    <WobbleCard bgImage={bgImage} containerClassName={height}>
      <div
        className={`relative text-(--white-color) bg-cover bg-center max-w-full ${height} flex flex-col items-start justify-center p-8 ${otherClassNameContainer}`}
      >
        <div className="relative flex flex-col items-start z-10">
          {renderTitle()}
          {description && type === 'big' && (
            <span className="text-sm font-medium py-3.5">{description}</span>
          )}
          {btnText && type === 'big' && (
            <Button
              variant="outline"
              borderRadius="rounded-none"
              handleClick={handleClick}
            >
              {btnText}
            </Button>
          )}
        </div>
        {overlay && <div className="absolute inset-0 bg-black/20 z-0" />}
      </div>
    </WobbleCard>
  );
};

export default Banner;
