import Button from '@/components/atoms/Button';
import CardWrapper from '@/components/Template/CardWrapper';
import { viewCartMode } from '@/utils/types';
import React from 'react';

const ApplyCouponCard = ({
  TitleStyle,
  viewMode,
}: {
  TitleStyle: string;
  viewMode: viewCartMode;
}) => {
  const formElStyle = 'h-[35px] outline-none';
  return (
    <CardWrapper withFlex={false}>
      <h3 className={TitleStyle}>Apply Coupon</h3>
      <form className="flex items-center gap-2.5 max-w-full w-full max-[991px]:flex-col max-[991px]:text-center">
        <input
          type="text"
          placeholder="Enter Your Coupon"
          className={`${formElStyle} p-2.5 max-w-full ${viewMode === 'table' ? 'w-[400px]' : 'w-full'} border border-(--seven-color) max-md:w-[300px] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-0`}
        />
        <Button
          variant="primary"
          otherClassName="py-[5px] px-[15px] max-[991px]:w-full"
        >
          Apply
        </Button>
      </form>
    </CardWrapper>
  );
};

export default ApplyCouponCard;
