import React from 'react';
import AuthHeader from '../molecules/AuthHeader';
import Button from '../atoms/Button';
import ButtonLoading from '../atoms/ButtonLoading';
import { AuthTemplateProps } from '@/interfaces';
import Form from '../molecules/Form';
import { FiShield } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PATHS } from '@/data/paths';

const AuthTemplate: React.FC<AuthTemplateProps> = ({
  error,
  register,
  handleFormSubmit,
  headerTitle,
  headerDescription,
  formChildren,
  children,
  loadingText,
  submitBtnText,
  loading,
  fieldsTypes,
  otherClassName,
}) => {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('auth');
  const isLogin = pathname.includes('login');

  return (
    <div className={`w-full max-w-md ${otherClassName}`}>
      <div className="rounded-xl relative z-10 shadow-2xl border-0 overflow-hidden">
        <div className="p-5 min-[425px]:p-5 bg-white">
          {headerTitle && headerDescription && (
            <AuthHeader title={headerTitle} description={headerDescription} />
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {formChildren ? (
              formChildren
            ) : (
              <>
                <Form
                  fieldsTypes={fieldsTypes}
                  error={error}
                  register={register}
                />
                {isLogin && (
                  <Link
                    href={PATHS.AUTH.FORGOT_PASSWORD}
                    className="group inline-flex items-center gap-1 hover:underline transition-colors text-sm text-(--forth-color)"
                  >
                    Forgot Password ?
                  </Link>
                )}
              </>
            )}
            <Button
              type="submit"
              disabled={loading}
              otherClassName="w-full hover:shadow-lg disabled:opacity-50"
            >
              {loading ? <ButtonLoading text={loadingText} /> : submitBtnText}
            </Button>
          </form>

          {isAuthPage && (
            <div className="flex items-center my-5">
              <div className="flex-grow h-px bg-gray-300" />
              <div className="flex-grow h-px bg-gray-300" />
            </div>
          )}

          {children}
        </div>

        <div className="h-2 bg-gradient-to-r from-(--forth-color) to-[var(--second-color)]"></div>
      </div>
      {isLogin && (
        <div className="flex items-center justify-center gap-1 text-sm mt-5 text-[#054b46]">
          <FiShield />
          <p>Your data is securely encrypted and protected</p>
        </div>
      )}
    </div>
  );
};

export default AuthTemplate;
