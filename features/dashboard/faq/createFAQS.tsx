/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/Hooks/useAPI';
import SettingsTab from '@/components/molecules/SettingsTab';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import Input from '@/components/atoms/Input';
import { useUpdateContent } from '@/context/updateContentContext';
import { InputTypes } from '@/utils/types';
import { CreateUsersProps, CreateUsersTableProps } from '@/interfaces';
import { CreateFAQFields } from '@/config/forms/faq.form';
import { faqSchema } from '@/validations/forms/createFAQ.schema';

const initialFAQ = {
  question: '',
  category: '',
  answer: '',
};

// ----------------------------------------------------------------

type CreateFAQFormData = yup.InferType<typeof faqSchema>;

const CreateFAQ = ({
  value,
  onEditIdChange,
  onTabChange,
}: CreateUsersTableProps) => {
  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'faq';

  // -----------------------------------------

  // API
  const { isLoading: addLoading, add } = useAPI<CreateUsersProps>('faqs');

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<any, any>({
    resolver: yupResolver(faqSchema),
    defaultValues: initialFAQ,
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CreateFAQFormData> = async (data) => {
    try {
      const formData = {
        question: data.question,
        category: data.category,
        answer: data.answer,
      };

      const response = await add(formData);

      if (response) {
        showToast('FAQ created successfully');
        reset(initialFAQ);
        onTabChange('allFAQ');
        onEditIdChange(null);
        triggerRefresh(refreshKey);
      }
    } catch (error: any) {
      console.error(error);
      showToast(error?.message || 'Something went wrong', 'error');
    }
  };

  // ----------------------------------------------------------------

  return (
    <SettingsTab
      value={value}
      title="Create Product"
      description="Create New Product for your store"
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateFAQFields.map(
            ({ id, label, name, type, placeholder, options = [] }: any) => {
              return (
                <div
                  key={id}
                  className={type === 'textarea' ? 'md:col-span-2' : ''}
                >
                  <Input
                    inputName={name}
                    type={type as InputTypes}
                    label={label}
                    placeholder={placeholder}
                    register={register}
                    options={options}
                    control={control}
                    error={errors}
                    otherClassName={`w-full ${type === 'textarea' ? 'h-26!' : ''}`}
                  />
                </div>
              );
            },
          )}
        </div>

        <Button type="submit" disabled={addLoading || !isDirty}>
          {addLoading ? (
            <ButtonLoading text="Save Changes..." />
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateFAQ;
