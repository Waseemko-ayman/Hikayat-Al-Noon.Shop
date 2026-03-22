'use client';
import { CreditCard, Plus } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { PaymentMethod } from '@/interfaces';
import PaymentMethodCard from '@/components/molecules/PaymentMethodCard';
import NoticeCard from '@/components/molecules/NoticeCard';
import { paymentMethodsData } from '@/data';
import EmptyState from '@/components/molecules/EmptyState';
import { PATHS } from '@/data/paths';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(paymentMethodsData);

  const handleRemove = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleAddNew = () => {
    console.log('Add new payment method');
  };

  return (
    <div className="mt-6">
      {/* Payment Methods Grid */}
      {paymentMethods.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          imageSrc="atm-card.png"
          messageText="No Payment Methods"
          description="You havent added any payment methods yet. Add a credit card, PayPal account, or bank account to get started."
          buttonText="Add Your First Payment Method"
          Icon={Plus}
          handleClick={handleAddNew}
          buttonHref={PATHS.HOME}
        />
      )}

      {/* Info Section */}
      <NoticeCard
        icon={<CreditCard className="text-black" size={20} />}
        title="Secure Payment Processing"
      >
        All payment information is encrypted and securely stored. We never store
        your full card numbers on our servers and use industry-standard security
        measures.
      </NoticeCard>
    </div>
  );
};

export default PaymentMethods;
