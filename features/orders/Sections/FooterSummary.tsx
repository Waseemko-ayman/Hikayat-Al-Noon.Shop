import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { FOOTER_SUMMARY } from '@/data';
import { OrderProps } from '@/interfaces';

const FooterSummary = ({ order }: { order: OrderProps }) => {
  return (
    <AnimatedWrapper>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-5 sm:gap-3">
        <div className="flex max-sm:justify-between gap-5">
          {FOOTER_SUMMARY(order).map((item) => (
            <div key={item.id}>
              <p className="text-sm text-slate-300">{item.title}</p>
              <p
                className={
                  item.title === 'Total Paid' ? 'sm:text-2xl font-bold' : ''
                }
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <div className="text-sm text-slate-300">
          Thank you for your purchase 🚀
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default FooterSummary;
