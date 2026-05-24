/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/atoms/Loading';
import useAPI from '@/Hooks/useAPI';
import SettingsTab from '@/components/molecules/SettingsTab';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import Input from '@/components/atoms/Input';
import { useUpdateContent } from '@/context/updateContentContext';
import supabase from '@/config/api';
import { PostsProps } from '@/interfaces';
import { CreatePostsFields } from '@/config/forms/posts.forms';
import { createPostsSchema } from '@/validations/forms/posts.schema';

const initialState = {
  title: '',
  excerpt: '',
  body: '',
  image: null,
  category: '',
  date: '',
};

// ----------------------------------------------------------------

const CreatePosts = ({
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
  // We use useEffect to generate names after mount (client-only)
  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'posts';

  // -----------------------------------------

  type PostFormData = yup.InferType<typeof createPostsSchema>;

  // API
  const { isLoading, error, getSingle, edit } = useAPI<PostsProps>('posts');
  const { isLoading: addLoading, add } = useAPI<PostsProps>('posts');
  const { get: getCategories, data: categories } = useAPI('posts_categories');

  const mappedCategories = categories?.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    value: cat.name, // optional but safe
  }));

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<any, any>({
    resolver: yupResolver(createPostsSchema),
  });

  // We use watch to get the selected file from the controller instead of using a separate state
  const imageFile = watch('image');

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    try {
      const formData: Record<string, any> = {
        title: data.title,
        excerpt: data.excerpt,
        body: data.body,
        category: data.category,
        date: new Date(data.date).toISOString().split('T')[0],
        is_featured: data.is_featured ?? false,
      };

      // image upload
      if (imageFile instanceof File) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data: uploaded, error } = await supabase.storage
          .from('posts')
          .upload(`images/${fileName}`, imageFile);

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
          .from('posts')
          .getPublicUrl(uploaded.path);

        formData.image = publicUrl.publicUrl;
      } else {
        formData.image = imageFile;
      }

      let response;
      if (editId !== null) {
        response = await edit(editId, formData);
      } else {
        response = await add(formData);
      }

      if (response) {
        showToast(editId ? 'Post updated' : 'Post created');
        reset(initialState);
        onTabChange('allPosts');
        onEditIdChange(null);
        triggerRefresh(refreshKey);
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    if (editId !== null) {
      (async () => {
        const res = await getSingle(editId);
        if (res) {
          reset({
            title: res[0]?.title ?? '',
            excerpt: res[0]?.excerpt ?? '',
            body: res[0]?.body ?? '',
            category: res[0]?.category ?? '',
            date: res[0]?.date ?? '',
            image: res[0]?.image ?? null,
          });
        }
      })();
    }
  }, [editId]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // ----------------------------------------------------------------

  return (
    <SettingsTab
      value={value}
      title="Create Post"
      description="Create New Post for your store"
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching error={error} />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 mb-5">
              {CreatePostsFields.map(
                ({ id, label, name, type, placeholder }) => {
                  return (
                    <Input
                      key={id}
                      inputName={name}
                      type={type}
                      label={label}
                      placeholder={placeholder || ''}
                      register={register}
                      otherClassName="w-full"
                      control={control}
                      options={
                        name === 'category' ? mappedCategories : undefined
                      }
                      error={errors}
                      FileUploadText="Main image"
                    />
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
          </>
        )}
      </form>
    </SettingsTab>
  );
};

export default CreatePosts;
