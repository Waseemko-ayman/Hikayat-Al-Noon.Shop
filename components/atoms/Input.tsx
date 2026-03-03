import { InputProps } from '@/interfaces';
import React from 'react';
import { Controller } from 'react-hook-form';
import MultiSelectInput from '../molecules/MultiSelectInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '../ui/file-upload';

const Input = ({
  type,
  variant = 'primary',
  placeholder,
  otherClassName,
  inputName,
  register,
  error,
  control,
  isMulti,
  value,
  onChange,
  Icon,
  options = [],
  iconClassName = 'ml-2',
  SelectValuePlaceholder = 'select...',
  disabled,
  onIconClick,
  label,
  labelClassName = '',
  isRequired = false,
  accept,
  required,
  FileUploadText,
  ...props
}: React.PropsWithChildren<InputProps>) => {
  const StyledInput = `w-[280px] px-2.5 bg-(--white-color) outline-none transition-all duration-300 ${
    variant === 'primary'
      ? 'border border-(--seven-color) focus-within:border-(--forth-color) rounded-none'
      : 'border-none rounded-l-md rounded-r-none'
  } ${otherClassName}`;

  const inputClasses = `w-full h-12 bg-transparent outline-none transition-all duration-300`;

  const ariaLabel = label || placeholder || inputName;

  const handleKeyboardClick =
    (callback?: () => void) => (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback?.();
      }
    };

  return (
    <div>
      {label && (
        <label
          className={`block text-sm font-semibold text-(--seconde-color) mb-2 ${labelClassName}`}
        >
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}
      {type === 'textarea' && control ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <textarea
              placeholder={placeholder}
              className={`${StyledInput} py-2 resize-none`}
              aria-label={ariaLabel}
              {...field}
            />
          )}
        />
      ) : type === 'textarea' && !control ? (
        <textarea
          placeholder={placeholder}
          className={`${StyledInput} py-2 resize-none`}
          aria-label={ariaLabel}
        />
      ) : type === 'select' && control ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className={`${StyledInput} h-12!`}>
                <SelectValue placeholder={SelectValuePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem
                    key={String(opt.id)}
                    value={'value' in opt ? String(opt.value) : String(opt.id)}
                  >
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      ) : isMulti && control ? (
        <MultiSelectInput
          inputName={inputName}
          control={control}
          options={options}
          placeholder={SelectValuePlaceholder}
          disabled={disabled}
        />
      ) : type === 'file' ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <FileUpload
              text={FileUploadText}
              value={field.value ?? ''}
              onChange={(files) => {
                const selectedFile = files[0] || null;
                field.onChange(selectedFile); // نمرر ملف واحد فقط
              }}
            />
          )}
        />
      ) : (
        <div className={`flex items-center px-3 ${StyledInput}`}>
          {control ? (
            <Controller
              name={inputName}
              control={control}
              render={({ field }) => (
                <input
                  type={type}
                  data-slot="input"
                  autoComplete="off"
                  placeholder={placeholder}
                  aria-label={ariaLabel}
                  className={inputClasses}
                  accept={accept}
                  {...props}
                  {...field}
                />
              )}
            />
          ) : (
            <input
              type={type}
              data-slot="input"
              autoComplete="off"
              placeholder={placeholder}
              className={inputClasses}
              aria-label={ariaLabel}
              {...(typeof register === 'function' ? register(inputName) : {})}
              onChange={onChange}
              value={value}
              accept={accept}
              {...props}
              required={required}
            />
          )}
          {Icon && (
            <Icon
              role="button"
              tabIndex={0}
              aria-label="Input action"
              className={`${iconClassName} text-xl cursor-pointer`}
              onClick={onIconClick}
              onKeyDown={handleKeyboardClick(onIconClick)}
            />
          )}
        </div>
      )}
      {error && error[inputName] && (
        <p className="text-sm text-red-500 mt-1">{error[inputName].message}</p>
      )}
    </div>
  );
};

export default Input;
