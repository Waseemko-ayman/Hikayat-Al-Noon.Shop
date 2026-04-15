import { OrderProps } from '@/interfaces';
import FooterSummary from './Sections/FooterSummary';
import OrderItems from './Sections/OrderItems';
import OrderSummary from './Sections/OrderSummary';
import OrderDetailsHeader from './Sections/OrderDetailsHeader';

const OrderDetailsPage = ({ order }: { order: OrderProps }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-8 pt-44">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <OrderDetailsHeader order={order} />

        {/* GRID SUMMARY */}
        <OrderSummary order={order} />

        {/* ITEMS SECTION */}
        <OrderItems orderItems={order?.order_items ?? []} />

        {/* FOOTER SUMMARY */}
        <FooterSummary order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
