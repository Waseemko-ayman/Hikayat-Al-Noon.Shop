/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Button from '../atoms/Button';
import { ProductDetailsInDialogProps } from '@/interfaces';
import ButtonLoading from '../atoms/ButtonLoading';
import { PATHS } from '@/data/paths';
import { LogInIcon } from 'lucide-react';
import { useCartContext } from '@/context/CartContext';
import { useSession } from '@/Hooks/useSession';
import useAPI from '@/Hooks/useAPI';
import { useRouter } from 'next/navigation';

const ProductDetailsInDialog: React.FC<ProductDetailsInDialogProps> = ({
  productData,
  showToast,
}) => {
  const [size, setSize] = useState('');
  const [errorMsgSize, setErrorMsgSize] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [clientReady, setClientReady] = useState(false);

  const { user, addToCart, isLoading } = useCartContext();
  const session = useSession();
  const router = useRouter();

  const { add, isLoading: isCheckoutLoading } = useAPI('checkout');

  const orderItem = {
    productId: productData.id,
    title: productData.title,
    image: productData.image,
    price: productData.price,
    size: size,
    quantity,
    total: (productData.price ?? 0) * quantity,
  };

  const handleCheckout = async () => {
    if (!size) {
      setErrorMsgSize(true);
      return;
    }
    const data = await add({
      items: [orderItem],
      userId: session?.user?.id,
      userEmail: session?.user?.email,
      userName: session?.user?.user_metadata.display_name,
      userPhone: session?.user?.user_metadata.phone,
    });

    router.replace(
      `/checkout?clientSecret=${data.clientSecret}&orderId=${data.orderId}`,
    );
  };

  const handleSelectSize = (value: string) => {
    setSize(value);
    setErrorMsgSize(false);
  };

  const handleAddProduct = async (product: any) => {
    if (!size) {
      setErrorMsgSize(true);
      return;
    }

    if (clientReady) {
      if (!user?.id) {
        showToast('Please log in to add products to your cart', 'error');
        return;
      }
    }

    await addToCart({ ...product, size, quantity }, user.id);
    showToast(`Add ${product.title} (${size} x${quantity}) to cart`);
  };

  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <div className="space-y-4 px-6 max-h-[600px] overflow-y-auto scrollbar-none">
      <Image
        src={productData.image || '/assets/no-image-available.webp'}
        alt={productData.title}
        width={200}
        height={200}
        className="rounded-lg mx-auto shadow-lg border"
      />
      <h2 className="text-2xl font-bold">{productData.title}</h2>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">${productData.price}.00</span>
        {productData.old_price && (
          <div className="flex gap-5">
            <span className="text-lg line-through text-gray-400">
              ${productData?.old_price}.00
            </span>

            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-sm">
              -{productData?.discount}%
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 h-10 rounded-md border border-input px-2"
        />
        <div>
          <Select value={size} onValueChange={handleSelectSize}>
            <SelectTrigger
              id="size"
              className={`w-30 md:w-28 !h-10 bg-background focus:!border-(--forth-color) ${
                errorMsgSize ? 'border-red-500' : ''
              }`}
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {productData.size?.map((s: string, index: number) => (
                <SelectItem key={index} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorMsgSize && (
            <p className="text-sm text-red-500 mt-1">Please select size</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {session ? (
          <>
            <Button
              variant="primary"
              otherClassName="!py-2 !px-4"
              handleClick={() => handleAddProduct(productData)}
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoading text="Adding..." /> : 'Add To Cart'}
            </Button>

            <Button
              variant="outline"
              otherClassName="group !py-2 !px-4 text-(--forth-color)! hover:text-white! border-(--forth-color)!"
              handleClick={handleCheckout}
              disabled={isCheckoutLoading}
            >
              {isCheckoutLoading ? (
                <ButtonLoading
                  text="Processing..."
                  borderColor="text-(--forth-color) group-hover:!border-t-transparent"
                  otherClassName="group-hover:!border-white"
                />
              ) : (
                'Buy Now'
              )}
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            otherClassName="!py-2 !px-4 flex items-center gap-2"
            href={PATHS.AUTH.LOGIN}
            Icon={LogInIcon}
            iconClassName="w-4 h-4"
          >
            Login to Buy
          </Button>
        )}
      </div>
      <div>
        <h3 className="font-bold text-[22px] mb-3">Product Details</h3>
        <p className="text-(--seconde-color) mt-3 text-sm">
          {productData.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsInDialog;
