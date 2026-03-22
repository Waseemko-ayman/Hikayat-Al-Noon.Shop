import Button from '@/components/atoms/Button';
import { useCartContext } from '@/context/CartContext';
import { useSession } from '@/Hooks/useSession';
import { TableRow } from '@/interfaces';
import { PATHS } from '@/data/paths';
import { LogIn } from 'lucide-react';
import React from 'react';

const CartTotals = ({ TitleStyle }: { TitleStyle: string }) => {
  // Context
  const { cartItems } = useCartContext();

  // Session Hook
  const session = useSession();

  const subTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const tdStyle = 'p-2.5 border border-(--seven-color) w-[50%]';

  const highlite = (row: TableRow) =>
    row.title.toLowerCase() === 'total'
      ? 'text-(--fifth-color) font-bold'
      : 'text-(--six-color)';

  const tabeleData: TableRow[] = [
    {
      id: 1,
      title: 'Cart Subtotal',
      price: subTotal,
    },
    {
      id: 2,
      title: 'Shipping',
      shipping: cartItems.length === 0 ? 'Free' : 10,
    },
    {
      id: 3,
      title: 'Total',
      price: subTotal,
    },
  ];
  return (
    <div className="max-w-full w-[600px] border border-(--seven-color) p-[30px]">
      <h3 className={TitleStyle}>Cart Totals</h3>
      <table className="max-w-full w-full border-0 mb-[15px]">
        <tbody>
          {tabeleData.map((row) => (
            <tr key={row.id}>
              <td className={`${tdStyle} ${highlite(row)}`}>{row.title}</td>
              <td className={`${tdStyle} ${highlite(row)}`}>
                {row.title.toLowerCase() === 'shipping'
                  ? typeof row.shipping === 'string'
                    ? row.shipping
                    : `$${row.shipping}`
                  : row.title.toLowerCase() === 'total'
                    ? `$${
                        subTotal +
                        (typeof tabeleData[1].shipping === 'number'
                          ? tabeleData[1].shipping
                          : 0)
                      }`
                    : `$${row.price}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {session ? (
        <Button variant="primary" otherClassName="!py-2.5 !px-5">
          Checkout Now
        </Button>
      ) : (
        <Button
          variant="primary"
          href={PATHS.AUTH.LOGIN}
          Icon={LogIn}
          iconClassName="w-4 h-4"
          otherClassName="!py-2.5 !px-5"
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default CartTotals;
