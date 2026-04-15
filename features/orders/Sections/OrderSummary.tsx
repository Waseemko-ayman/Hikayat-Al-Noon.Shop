import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import CardWrapper from '@/components/Template/CardWrapper';
import { OrderSummaryCard } from '@/data';
import { OrderProps } from '@/interfaces';

const OrderSummary = ({ order }: { order: OrderProps }) => {
  return (
    <div className="flex overflow-x-auto scrollbar-none md:grid md:grid-cols-4 gap-4">
      {OrderSummaryCard({ order }).map((item, index) => {
        const Icon = item?.icon;
        return (
          <AnimatedWrapper key={item.id} custom={index}>
            <CardWrapper withFlex={false} contentClassName="min-w-[160px]">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Icon className="w-4 h-4" />
                {item.title}
              </div>
              <p className="mt-2 font-semibold text-slate-900">{item.value}</p>
            </CardWrapper>
          </AnimatedWrapper>
        );
      })}
    </div>
  );
};

export default OrderSummary;
