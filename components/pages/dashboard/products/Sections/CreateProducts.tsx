/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/atoms/Loading';
import useAPI from '@/Hooks/useAPI';
import SettingsTab from '@/components/molecules/SettingsTab';
import { CreateProductsFields } from '@/config/forms/products.forms';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import Input from '@/components/atoms/Input';
import { useUpdateContent } from '@/context/updateContentContext';
import AttachmentsUploader from '@/components/molecules/AttachmentsPreview';
import supabase from '@/config/api';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  trade_mark: string;
  price: number;
  old_price?: number;
  discount?: number;
  image?: string;
  gallery?: string;
  size?: string[];
}

const initialState = {
  title: '',
  description: '',
  trade_mark: '',
  price: 0,
  old_price: null,
  discount: null,
  size: [],
  section: null,
  category: null,
  image: null,
  gallery: [],
};

// ----------------------------------------------------------------

const CreateProducts = ({
  value,
  editId,
  onEditIdChange,
  onTabChange,
}: {
  value: string;
  editId: string | number | null;
  onEditIdChange: (id: string | number | null) => void;
  onTabChange: (val: string) => void;
}) => {
  const [sectionsOptions, setSectionsOptions] = useState<any[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);
  // We use useEffect to generate names after mount (client-only)
  const [clientReady, setClientReady] = useState(false);

  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'products';

  // -----------------------------------------

  const createSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    trade_mark: yup.string().required('Trade Mark is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .required('Price is required'),
    old_price: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value,
      )
      .nullable()
      .typeError('Old Price must be a number'),

    discount: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value,
      )
      .nullable()
      .typeError('Discount must be a number'),

    size: yup
      .array()
      .of(yup.string().required())
      .min(1, 'Please select at least one size')
      .required('Size is required')
      .defined(),

    category: yup.string().required('Category is required'),

    section: yup
      .string()
      .nullable()
      .transform((val) => (val === '' ? null : val))
      .default(null),

    image: yup.mixed().test('required', 'Image is required', function (value) {
      if (editId !== null) return true;
      return value !== null && value !== undefined; // ملف واحد موجود
    }),

    gallery: yup
      .array()
      .of(yup.mixed<File>().required())
      .nullable()
      .default(null),
  });

  type ProductFormData = yup.InferType<typeof createSchema>;

  // API
  const { isLoading, error, getSingle, edit } =
    useAPI<ProductCardProps>('products');

  const { isLoading: addLoading, add } = useAPI<ProductCardProps>('products');

  const { get: getSections, data: sections } =
    useAPI<ProductCardProps>('sections');

  const { get: getCategories, data: categories } =
    useAPI<ProductCardProps>('categories');

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any, any>({
    resolver: yupResolver(createSchema),
  });

  // We use watch to get the selected file from the controller instead of using a separate state
  const imageFile = watch('image');
  const galleryValue = watch('gallery') || [];

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<ProductFormData> = async (data: any) => {
    try {
      const formData: Record<string, any> = {
        title: data.title,
        description: data.description,
        trade_mark: data.trade_mark,
        price: data.price,
        old_price: data.old_price || null,
        discount: data.discount || null,
        size: data.size,
        section: data.section,
        category: data.category,
      };

      // ✅ Ensure this code runs only on the client to prevent hydration mismatch
      if (clientReady) {
        // -------------------------------- IMAGE
        // Uploading the main image
        if (imageFile instanceof File) {
          const fileName = `${Date.now()}-${imageFile.name}`;
          const { data: uploaded, error: uploadError } = await supabase.storage
            .from('products')
            .upload(`images/${fileName}`, imageFile);

          // Throw an error if the upload fails
          if (uploadError) throw uploadError;

          const { data: publicData } = supabase.storage
            .from('products')
            .getPublicUrl(uploaded.path);

          formData.image = publicData.publicUrl;
        } else {
          formData.image = imageFile; // URL القديم
        }

        // -------------------------------- GALLERY
        // Array to store the URLs of uploaded images
        if (galleryValue.length > 0) {
          const galleryUrls = await Promise.all(
            galleryValue.map(async (item: any) => {
              if (item instanceof File) {
                const fileName = `${Date.now()}-${item.name}`;
                const { data: uploaded, error } = await supabase.storage
                  .from('products')
                  .upload(`gallery/${fileName}`, item);

                if (error) throw error;

                const { data: publicData } = supabase.storage
                  .from('products')
                  .getPublicUrl(uploaded.path);

                return publicData.publicUrl;
              }
              return item; // URL قديم
            }),
          );

          formData.gallery = galleryUrls;
        } else {
          formData.gallery = []; // فارغ إذا لم يكن هناك صور
        }
      }

      let response: any;
      if (editId !== null) {
        response = await edit(editId, formData);
      } else {
        response = await add(formData);
      }

      if (response) {
        showToast(
          editId !== null
            ? 'Product updated successfully'
            : 'Product created successfully',
        );
        reset(initialState);
        onTabChange('allProducts');
        onEditIdChange(null);
        triggerRefresh(refreshKey);
      }
    } catch (error: any) {
      console.error(error);
      showToast(error?.message || 'Something went wrong', 'error');
    }
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    if (editId !== null) {
      (async () => {
        try {
          const res = await getSingle(editId);
          if (res) {
            reset({
              title: res[0]?.title ?? '',
              description: res[0]?.description ?? '',
              trade_mark: res[0]?.trade_mark ?? '',
              price: res[0]?.price,
              old_price: res[0]?.old_price,
              discount: res[0]?.discount,
              size: res[0]?.size,
              section: res[0]?.section,
              category: res[0]?.category,
              image: res[0]?.image || null,
              gallery: res[0]?.gallery || [],
            });
          }
        } catch (error) {
          console.error('فشل في جلب بيانات القسم:', error);
          showToast((error as any)?.response?.message, 'error');
        }
      })();
    }
  }, [editId, reset]);

  useEffect(() => {
    getSections();
    getCategories();
    setClientReady(true);
  }, []);

  useEffect(() => {
    setSectionsOptions(sections || []);
    setCategoriesOptions(categories || []);
  }, [sections, categories]);

  // ----------------------------------------------------------------

  return (
    <SettingsTab
      value={value}
      title="Create Product"
      description="Create New Product for your store"
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching error={error} />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 mb-5">
              {CreateProductsFields.map(
                ({ id, label, name, type, placeholder, options }) => {
                  const isMultiSelect = ['size'].includes(name);

                  if (name === 'section') options = sectionsOptions ?? [];
                  else if (name === 'category')
                    options = categoriesOptions ?? [];

                  if (name === 'gallery') {
                    return (
                      /*
                        - We made the Controlled Component
                        -- Meaning:
                          - The value comes from outside.
                          - The adjustment goes back outside.
                      */
                      <AttachmentsUploader
                        key={id}
                        value={galleryValue}
                        onChange={(files: (File | string)[]) =>
                          setValue('gallery', files)
                        }
                      />
                    );
                  }
                  return (
                    <Input
                      key={id}
                      inputName={name}
                      type={type}
                      label={label}
                      placeholder={placeholder}
                      register={register}
                      options={options}
                      otherClassName="w-full"
                      control={control}
                      isMulti={isMultiSelect}
                      error={errors}
                      FileUploadText="Main image"
                    />
                  );
                },
              )}
            </div>

            <Button type="submit">
              {addLoading ? (
                <ButtonLoading text="Save Changes..." />
              ) : (
                'Save Changes'
              )}
            </Button>
          </>
        )}
      </form>
    </SettingsTab>
  );
};

export default CreateProducts;
