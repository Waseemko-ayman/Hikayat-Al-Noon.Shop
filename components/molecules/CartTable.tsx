import { CartTableProps } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import QuantityController from './QuantityController';
import ButtonTrash from './ButtonTrash';

const CartTable: React.FC<CartTableProps> = ({
  tabeleData,
  updateQuantity,
  handleDelete,
}) => {
  const commonClassName = `p-[15px] border border-[#2d2d2d80]`;
  const fullWidth = 'max-w-full w-full';

  return (
    <div className="overflow-x-auto">
      <table
        className={`text-center border-spacing-0 whitespace-nowrap ${fullWidth}`}
      >
        <thead>
          <tr className={fullWidth}>
            {tabeleData.tableHeaders.map((header, index) => (
              <th
                key={index}
                className={`text-(--white-color) bg-(--forth-color) uppercase border-y-(--forth-color) text-center ${commonClassName}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabeleData.tabelContent.map((item) => (
            <tr key={item.id ?? 0} className="text-(--seconde-color) font-bold">
              <td className={commonClassName}>
                <ButtonTrash
                  handleClick={() => handleDelete(item?.id ?? 0, item.title)}
                  otherClassName="group flex items-center justify-center w-10 h-10 border-none bg-red-50 hover:bg-red-500 mx-auto"
                />
              </td>
              <td className={commonClassName}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className="max-w-full w-[100px] mx-auto rounded-lg"
                  width={100}
                  height={100}
                />
              </td>
              <td className={commonClassName}>{item.title}</td>
              <td className={commonClassName}>
                <p
                  id={`price${item.id ?? 0 + 1}`}
                  className="relative w-fit px-2.5 my-0 mx-auto"
                >
                  ${item?.price?.toFixed(2)}
                </p>
              </td>
              <td className={commonClassName}>
                <p className="relative w-fit px-2.5 my-0 mx-auto">
                  {typeof item?.size === 'string'
                    ? item?.size
                    : item?.size?.join(', ')}
                </p>
              </td>
              <td className={`text-lg ${commonClassName}`}>
                <QuantityController
                  item={item}
                  updateQuantity={updateQuantity}
                />
              </td>
              <td className={commonClassName}>
                <p>
                  $
                  {item?.price && item?.quantity
                    ? (item.price * item.quantity).toFixed(2)
                    : 0}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
