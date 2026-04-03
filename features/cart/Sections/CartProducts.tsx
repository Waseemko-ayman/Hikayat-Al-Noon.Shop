'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import { useCartContext } from '@/context/CartContext';
import { useToast } from '@/lib/toast';
import CartTable from '@/components/molecules/CartTable';
import { FaBorderAll, FaCartShopping, FaTable } from 'react-icons/fa6';
import CartCards from '@/components/molecules/CartCards';
import EmptyState from '@/components/molecules/EmptyState';
import { PATHS } from '@/data/paths';
import CartTableSkeleton from '@/components/Skeletons/CartTableSkeleton';
import ApplyCoupon from './ApplyCoupon';
import { viewCartMode } from '@/utils/types';

const CartProducts = () => {
  const [viewMode, setViewMode] = useState<viewCartMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart_view_mode');
      return stored === 'table' || stored === 'cards' ? stored : 'table';
    }
    return 'table';
  });

  const { cartItems, updateQuantity, removeFromCart, isLoading } =
    useCartContext();
  const { showToast } = useToast();

  const tabeleData = {
    tableHeaders: [
      'Remove',
      'Image',
      'Product',
      'Price',
      'Size',
      'Quantity',
      'Subtotal',
    ],
    tabelContent: cartItems,
  };

  const handleDelete = async (id: number, itemTitle: string) => {
    removeFromCart(id);
    showToast(`${itemTitle} removed from cart`);
  };

  useEffect(() => {
    localStorage.setItem('cart_view_mode', viewMode);
  }, [viewMode]);

  return (
    <Layer>
      <Container otherClassName="max-[991px]:pb-5">
        {cartItems.length > 0 && (
          <div className="flex justify-center md:justify-end gap-2 mb-4">
            <Button
              otherClassName={`!px-4 !py-2 ${
                viewMode === 'table'
                  ? 'bg-(--forth-color) text-white'
                  : 'bg-(--seven-color) text-(--six-color)'
              }`}
              handleClick={() => setViewMode('table')}
              aria-label="Switch to table view"
            >
              <FaTable size={20} />
            </Button>
            <Button
              otherClassName={`!px-4 !py-2 ${
                viewMode === 'cards'
                  ? 'bg-(--forth-color) text-white'
                  : 'bg-(--seven-color) text-(--six-color)'
              }`}
              handleClick={() => setViewMode('cards')}
              aria-label="Switch to cards view"
            >
              <FaBorderAll size={20} />
            </Button>
          </div>
        )}

        {cartItems && cartItems.length > 0 ? (
          viewMode === 'table' ? (
            isLoading ? (
              <CartTableSkeleton />
            ) : (
              <>
                <CartTable
                  tabeleData={tabeleData}
                  updateQuantity={updateQuantity}
                  handleDelete={handleDelete}
                />
                {cartItems.length > 0 && (
                  <div className="mt-4">
                    <ApplyCoupon viewMode={viewMode} />
                  </div>
                )}
              </>
            )
          ) : (
            <div className="flex flex-wrap gap-4">
              <div className="flex-grow min-w-[300px] max-w-full">
                <CartCards
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  handleDelete={handleDelete}
                  isLoading={isLoading}
                />
              </div>

              {cartItems.length > 0 && (
                <div className="flex-shrink-0 w-full md:w-[400px]">
                  <ApplyCoupon viewMode={viewMode} />
                </div>
              )}
            </div>
          )
        ) : (
          <EmptyState
            imageSrc="empty-cart.png"
            messageText="Your shopping basket is ready and calling you to shop!"
            buttonText="Shop now"
            Icon={FaCartShopping}
            buttonHref={PATHS.SHOP.ROOT}
          />
        )}
      </Container>
    </Layer>
  );
};

export default CartProducts;
