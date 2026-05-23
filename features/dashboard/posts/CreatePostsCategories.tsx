'use client';
import Layer from '@/components/atoms/Layer';
import SettingsTab from '@/components/molecules/SettingsTab';
import useAPI from '@/Hooks/useAPI';
import { useToast } from '@/lib/toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/atoms/Input';
import { postsCategoriesSchema } from '@/validations/forms/postsCategories.schema';
import { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import Loading from '@/components/atoms/Loading';
import { Badge, X } from 'lucide-react';

export const postsCategoriessInputs = [
  {
    id: 1,
    type: 'text',
    name: 'name',
    label: 'Post Category',
    placeholder: 'ex: fashion tips...',
  },
];

const CreatePostsCategories = () => {
  const { showToast } = useToast();
  const { get, del, data: categories, isLoading } = useAPI('posts_categories');

  const [localCategories, setLocalCategories] = useState(categories || []);

  const {
    add,
    isLoading: addLoading,
    error: errorAdd,
  } = useAPI('posts_categories');

  const initialCategoriesInfo = {
    name: '',
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(postsCategoriesSchema),
    defaultValues: initialCategoriesInfo,
    mode: 'onChange',
  });

  const handleDelete = async (id: number, itemTitle: string) => {
    const previous = localCategories;

    setLocalCategories((prev) => prev.filter((category) => category.id !== id));

    try {
      await del(id);
      showToast(`${itemTitle} removed successfully`);
    } catch {
      setLocalCategories(previous);
      showToast('Failed to delete category', 'error');
    }
  };

  const onSubmit = async (data: { name: string }) => {
    try {
      await add(data);

      const createdCategory = {
        id: Date.now(),
        name: data.name,
      };

      setLocalCategories((prev) => [createdCategory, ...prev]);
      reset(initialCategoriesInfo);
      showToast('Post category created successfully');
    } catch {
      showToast(errorAdd?.message || 'Failed to create post category', 'error');
    }
  };

  useEffect(() => {
    if (categories) {
      setLocalCategories(categories);
    }
  }, [categories]);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Layer otherClassName="!py-0">
      <SettingsTab
        value="createPostsCategories"
        title="Create Post Category"
        description="Create New Post Category for your store"
        cardContentClassName="!p-0"
      >
        {/* {isLoading ? (
          <Loading />
        ) : (
        )} */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col sm:flex-row sm:items-end gap-3 p-6"
        >
          {postsCategoriessInputs.map((input) => {
            const { id, label, type, name, placeholder } = input;

            return (
              <div key={id} className="flex-1 w-full">
                <Input
                  type={type}
                  label={label}
                  inputName={name}
                  placeholder={placeholder}
                  register={register}
                  error={errors}
                  otherClassName="rounded-xl! w-full"
                />
              </div>
            );
          })}

          <Button
            type="submit"
            disabled={addLoading || !isDirty}
            otherClassName="w-full sm:w-auto shrink-0"
          >
            {addLoading ? (
              <ButtonLoading text="Save Changes..." />
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Existing Categories
          </h3>

          {isLoading ? (
            <Loading />
          ) : localCategories?.length ? (
            <div className="flex flex-wrap gap-3">
              {localCategories.map((category) => (
                <div
                  key={category.id}
                  className="
                    group flex items-center gap-2
                    px-4 py-2 rounded-xl
                    border border-gray-200 bg-white shadow-sm
                    hover:shadow-md transition-all duration-200
                    max-sm:px-3 max-sm:py-1.5 max-sm:rounded-full max-sm:gap-1.5 "
                >
                  <Badge className="max-sm:w-3.5 max-sm:h-3.5" />
                  <span className="text-sm font-medium text-gray-700 max-sm:text-xs max-sm:max-w-[120px] max-sm:truncate">
                    {category.name}
                  </span>

                  <Button
                    variant="circle"
                    handleClick={() => handleDelete(category.id, category.name)}
                    aria-label="Remove item"
                    otherClassName=" flex items-center justify-center w-5! h-5! text-red-500 border-none bg-red-50 hover:bg-red-500 hover:text-white transition max-sm:w-4 max-sm:h-4 max-sm:ml-1"
                  >
                    <X className="w-3 h-3 max-sm:w-2.5 max-sm:h-2.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No categories found.</p>
          )}
        </div>
      </SettingsTab>
    </Layer>
  );
};

export default CreatePostsCategories;
