'use client';
import React from 'react';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Layer from '@/components/atoms/Layer';
import { INPUT_TYPE } from '@/data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from '@/interfaces';
import useAPI from '@/Hooks/useAPI';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import { useToast } from '@/lib/toast';
import { formSchema } from '@/validations/forms/message.schema';

const LeaveMessage = () => {
  const { add, isLoading } = useAPI('messages');

  // Notifications
  const { showToast } = useToast();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    await add({
      username: data.username,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    reset();
    showToast('Your message has been sent successfully, thank you.');
  };

  return (
    <Layer>
      <Container otherClassName="flex items-start justify-between">
        <div className="max-w-[1025px] mx-auto flex-1 py-5 md:py-8 px-5 border border-(--seven-color) gap-10 max-[992px]:flex-wrap max-[992px]:gap-10 rounded-md">
          <div className="space-y-2 mb-7">
            <div className="w-fit uppercase text-(--forth-color) block max-md:text-center">
              Leave A Message
            </div>
            <h2 className="text-(--fifth-color) text-2xl md:text-3xl font-bold max-md:text-center">
              We love to hear from you
            </h2>
          </div>
          <form
            className="max-w-full w-full flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {INPUT_TYPE.map(({ id, type, name, placeholder }) => (
              <div key={id}>
                <Input
                  type={type}
                  inputName={name}
                  placeholder={placeholder}
                  register={register}
                  error={errors}
                  otherClassName={`rounded-md! ${
                    errors[name as keyof FormValues] ? '!border-red-600' : ''
                  }${type === 'textarea' ? 'h-[205px]' : ''} w-full`}
                />
              </div>
            ))}
            <Button variant="primary" disabled={isLoading || !isDirty}>
              {isLoading ? <ButtonLoading text="Submit" /> : 'Submit'}
            </Button>
          </form>
        </div>
      </Container>
    </Layer>
  );
};

export default LeaveMessage;
