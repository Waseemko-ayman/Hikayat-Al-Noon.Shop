'use client';
import Input from '@/components/atoms/Input';
import AccountSectionHeader from '@/components/molecules/AccountSectionHeader';
import { profileSecInputs } from '@/data';
import Loading from '@/components/atoms/Loading';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import CardWrapper from '@/components/Template/CardWrapper';
import { ProfleFormProps } from '@/interfaces';

const Profile = ({
  errors,
  register,
  isLoading,
  loading,
  isDirty,
}: ProfleFormProps) => {
  return (
    <>
      <AccountSectionHeader
        title="Profile Information"
        description="Update your personal details"
      />

      <CardWrapper otherClassName="rounded-t-none!" withFlex={false}>
        {isLoading ? (
          <Loading showText={false} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {profileSecInputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <Input
                  id={input.name}
                  type={input.type}
                  label={input.label}
                  inputName={input.name}
                  placeholder={input.placeholder}
                  otherClassName="w-full"
                  register={register}
                  error={errors}
                />
              </div>
            ))}
          </div>
        )}
        <Button
          type="submit"
          disabled={loading || !isDirty}
          otherClassName="w-full hover:shadow-lg disabled:opacity-50 mt-6"
        >
          {loading ? <ButtonLoading text="save changes..." /> : 'Save Changes'}
        </Button>
      </CardWrapper>
    </>
  );
};

export default Profile;
