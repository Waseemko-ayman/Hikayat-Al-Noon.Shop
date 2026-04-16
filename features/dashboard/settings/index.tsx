/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { Truck, RefreshCw } from 'lucide-react';
import useAPI from '@/Hooks/useAPI';
import Loading from '@/components/atoms/Loading';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shippingSettingsSchema } from '@/validations/forms/shippingSettings.schema';
import { shippingSettingsInputs } from '@/data';
import Input from '@/components/atoms/Input';
import { shippingSettingsProps } from '@/interfaces';
import { useToast } from '@/lib/toast';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import { formatPrice } from '@/utils/formatPrice';

const SettingsPage = () => {
  const { showToast } = useToast();
  const {
    get,
    edit,
    data: shippingSettingsData,
    isLoading,
    error,
  } = useAPI('settings');

  const initialShippingSettingsInfo = {
    shipping: shippingSettingsData[0]?.shipping || 0,
    free_shipping_min: shippingSettingsData[0]?.free_shipping_min || 0,
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(shippingSettingsSchema),
    defaultValues: initialShippingSettingsInfo,
    mode: 'onChange',
  });

  const onSubmit = async (data: shippingSettingsProps) => {
    try {
      await edit(shippingSettingsData[0]?.id, data);

      showToast('Shipping settings updated successfully');
    } catch {
      showToast(
        error?.message || 'Failed to update shipping settings',
        'error',
      );
    }
  };

  useEffect(() => {
    reset(initialShippingSettingsInfo);
  }, [shippingSettingsData, reset]);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <>
      {/* Header */}
      <header className="bg-(--forth-color) text-white rounded-lg mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4">
          <div className="flex max-sm:flex-col justify-center max-sm:text-center items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Shipping Configuration</h1>
              <p className="text-sm text-white/80">
                Manage your shipping rates, free shipping thresholds, and
                delivery options.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600">
            <Truck size={18} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Shipping Settings
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Configure your store&apos;s shipping rates and thresholds.
            </p>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shippingSettingsInputs.map((input) => {
                  const { id, label, type, name, placeholder, icon } = input;
                  const Icon = icon;
                  return (
                    <div key={id}>
                      <Input
                        type={type}
                        label={label}
                        inputName={name}
                        placeholder={placeholder}
                        Icon={Icon}
                        register={register}
                        error={errors}
                        inputClassName="pl-17!"
                        otherClassName="w-full! rounded-xl! pl-0! overflow-x-hidden"
                        iconWrapper="flex items-center justify-center px-3.5 py-3 bg-gray-50 border-r border-gray-200"
                        iconClassName="text-gray-500 cursor-default!"
                      />
                    </div>
                  );
                })}
              </div>

              {shippingSettingsData && (
                <div className="mt-7 flex items-start gap-2.5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Truck
                    size={15}
                    className="text-blue-500 mt-0.5 shrink-0"
                    strokeWidth={2.2}
                  />
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Customers will pay{' '}
                    <span className="font-semibold">
                      {formatPrice(shippingSettingsData[0]?.shipping || '0')}
                    </span>{' '}
                    for shipping. Orders over{' '}
                    <span className="font-semibold">
                      {formatPrice(
                        shippingSettingsData[0]?.free_shipping_min || '0',
                      )}
                    </span>{' '}
                    ship free.
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
              <Button
                variant="text"
                type="button"
                handleClick={() => reset(initialShippingSettingsInfo)}
                otherClassName="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-40 p-0!"
              >
                <RefreshCw size={14} strokeWidth={2} />
                Reset
              </Button>

              <Button type="submit" disabled={isLoading || !isDirty}>
                {isLoading ? (
                  <ButtonLoading text="Save Changes..." />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default SettingsPage;
