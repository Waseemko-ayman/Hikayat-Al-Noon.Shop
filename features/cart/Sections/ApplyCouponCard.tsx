import Button from '@/components/atoms/Button';
import React from 'react';

const ApplyCouponCard = ({ TitleStyle }: { TitleStyle: string }) => {
  const formElStyle = 'h-[35px] outline-none';
  return (
    <div className="relative bg-white border border-[#2d2d2d20] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
      <h3 className={TitleStyle}>Apply Coupon</h3>
      <form className="flex items-center gap-2.5 max-w-full w-full max-[991px]:flex-col max-[991px]:text-center">
        <input
          type="text"
          placeholder="Enter Your Coupon"
          className={`${formElStyle} p-2.5 max-w-full w-[400px] border border-(--seven-color) max-md:w-[300px] placeholder:transition-all placeholder:duration-300 focus:placeholder:opacity-0`}
        />
        <Button
          variant="primary"
          otherClassName="py-[5px] px-[15px] max-[991px]:w-full"
        >
          Apply
        </Button>
      </form>
    </div>
  );
};

export default ApplyCouponCard;
