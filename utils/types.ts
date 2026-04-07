export type ButtonMainVarinats =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'cover'
  | 'circle';
export type ButtonVarinats =
  | ButtonMainVarinats
  | 'third'
  | 'forth'
  | 'fifth'
  | 'ghost'
  | 'circle'
  | 'text';
export type ButtonTypes = 'submit' | 'button' | 'reset';
export type ButtonIconPosition = 'left' | 'right';
export type InputTypes =
  | 'text'
  | 'password'
  | 'search'
  | 'number'
  | 'email'
  | 'phone'
  | 'tel'
  | 'select'
  | 'multi-select'
  | 'date'
  | 'editor'
  | 'radio'
  | 'file'
  | 'textarea'
  | 'checkbox';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type flexVariant = 'responsive' | 'row';
export type viewCartMode = 'table' | 'cards';
