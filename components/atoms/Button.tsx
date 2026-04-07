import React, { forwardRef, Ref } from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/interfaces';

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & { href?: string; ariaLabel?: string }
>(
  (
    {
      children,
      variant = 'primary',
      borderRadius = 'rounded-md',
      otherClassName = '',
      type = 'submit',
      handleClick,
      Icon,
      iconPosition = 'left',
      disabled = false,
      href,
      iconClassName,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : '';

    const classes = `${
      variant !== 'cover' ? 'py-3 px-8' : 'py-4 px-20'
    } cursor-pointer text-base outline-none font-semibold transition-all duration-200 ${borderRadius} ${
      variant === 'primary'
        ? 'bg-(--forth-color) text-(--white-color) hover:bg-[#054b46]'
        : variant === 'secondary'
          ? 'bg-(--white-color) text-black hover:bg-(--forth-color) hover:text-(--white-color)'
          : variant === 'outline'
            ? 'bg-transparent border border-white text-(--white-color) hover:bg-(--forth-color) hover:text-(--white-color) hover:border-(--forth-color)'
            : variant === 'cover'
              ? 'bg-center bg-transparent bg-no-repeat text-(--forth-color)'
              : variant === 'circle'
                ? 'w-10 h-10 !p-0 bg-[#e8f6ea] text-(--forth-color) hover:bg-(--forth-color) hover:text-(--white-color) hover:border-(--white-color) hover:rotate-[360deg] border border-[#cce7d0] !rounded-[50%] transition-all duration-200'
                : variant === 'ghost'
                  ? 'text-(--forth-color) hover:bg-gray-200'
                  : variant === 'text'
                    ? 'text-(--forth-color) bg-transparent hover:underline'
                    : ''
    } ${Icon ? 'flex! items-center gap-2 w-fit' : ''} ${disabledClasses} ${otherClassName}`;

    const content = (
      <>
        {iconPosition === 'left' && Icon && <Icon className={iconClassName} />}
        {children}
        {iconPosition === 'right' && Icon && <Icon className={iconClassName} />}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          aria-label={ariaLabel}
          style={{
            backgroundImage:
              variant === 'cover'
                ? 'url(/assets/landing/buttonLanding.png)'
                : 'none',
          }}
          {...props}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        onClick={handleClick}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{
          backgroundImage:
            variant === 'cover'
              ? 'url(/assets/landing/buttonLanding.png)'
              : 'none',
        }}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
