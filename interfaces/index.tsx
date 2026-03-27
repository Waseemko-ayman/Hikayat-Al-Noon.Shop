/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonIconPosition,
  ButtonTypes,
  ButtonVarinats,
  flexVariant,
  InputTypes,
  ToastType,
} from '@/utils/types';
import { Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface APIRequest {
  isLoading: boolean;
  error: any;
  refresh: () => void;
}

export interface FormValues {
  username: string;
  email: string;
  subject: string;
  message: string;
}

interface ProductImage {
  id: number;
  image: string;
}

export interface ProductCardProps {
  id?: number;
  created_at?: string;
  slug?: string;
  image: string;
  title: string;
  gallery?: ProductImage[];
  trade_mark?: string;
  price?: number;
  old_price?: number;
  discount?: number;
  quantity?: number;
  ratings?: number[];
  comment?: string;
  date_added?: string;
  size?: string[];
  description?: string;
  section?: string;
  category?: string;
  productData: any;
  handleClick?: () => void;
  otherClassName?: string;
}

export interface CartContextType {
  user: any;
  isLoading: boolean;
  cartItems: ProductCardProps[];
  addToCart: (item: ProductCardProps, userId: string) => void;
  updateQuantity: (idOrSlug: number, quantity: number) => void;
  removeFromCart: (idOrSlug: number) => void;
  clearCart: () => void;
}

export interface ButtonProps {
  children?: React.ReactNode;
  otherClassName?: string;
  variant?: ButtonVarinats;
  borderRadius?: string;
  // handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClick?: (e: any) => void;
  type?: ButtonTypes;
  Icon?: React.ElementType;
  iconPosition?: ButtonIconPosition;
  iconClassName?: string;
  disabled?: boolean;
  // bgColor?: string;
  // hoverBgColor?: string;
  target?: string;
}

export interface CartProps {
  updateQuantity: (id: number, quantity: number) => void;
  handleDelete: (id: number, itemTitle: string) => void;
}

export interface CartTableProps extends CartProps {
  tabeleData: { tableHeaders: string[]; tabelContent: ProductCardProps[] };
}

export interface CartCardseProps extends CartProps {
  cartItems: ProductCardProps[];
  isLoading: boolean;
}

export type TableRow = {
  id: number;
  title: string;
  price?: number;
  shipping?: number | string;
};

export interface AnimatedWrapperProps {
  children: ReactNode;
  custom?: number;
  variants?: Variants;
  direction?: 'x' | 'y';
  distance?: number;
  duration?: number;
}

export interface QuantityControllerProps {
  otherClassName?: string;
  item: {
    id?: number | string;
    slug?: string;
    quantity?: number;
  };
  updateQuantity: (key: number, quantity: number) => void;
}

export interface AuthHeaderProps {
  title?: string;
  description?: string;
}

export interface AuthRedirectProps {
  text: string;
  linkText: string;
  href: string;
}

export interface FieldType {
  id: number | string;
  name: string;
  type: InputTypes | string;
  label: string;
  placeholder: string;
}

export interface StatusPasswordProps {
  title: string;
  description: string;
  icon: 'check' | 'lock';
  iconBgColor?: string;
  iconColor?: string;
  linkText?: string;
  linkHref?: string;
  infoText?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface AuthTemplateProps {
  error?: string | Record<string, any>;
  control?: any;
  handleFormSubmit?: (data: any) => Promise<void>;
  headerTitle?: string;
  headerDescription?: string;
  formChildren?: React.ReactNode;
  children?: React.ReactNode;
  loadingText: string;
  submitBtnText: string;
  loading: boolean;
  fieldsTypes?: FieldType[];
  otherClassName?: string;
  register?: UseFormRegister<any>;
}

export interface FormProps {
  error?: string | Record<string, any>;
  control?: any;
  register?: UseFormRegister<any>;
  fieldsTypes?: FieldType[];
}

export interface NavItemProps {
  name: string | ReactNode;
  linkPath?: string;
  otherClassNameIcon?: string;
  showArrow?: boolean;
  onClick?: () => void;
  Icon?: React.ElementType | string | any;
  otherClassName?: string;
  isMobile?: boolean;
  disablePrefetch?: boolean;
}

export interface NavItem {
  name: string;
  link: string;
}

export interface NavItemLinkProps {
  item: NavItem;
  linksStyleing: string;
  isMobile?: boolean;
}

export interface AccountSectionHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  handleBack?: () => void;
}
export interface InputProps extends React.HTMLAttributes<HTMLElement> {
  type: InputTypes | string;
  placeholder: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  inputName: any;
  Icon?: React.ElementType;
  iconClassName?: string;
  onIconClick?: () => void;
  options?: any[];
  register?: UseFormRegister<FormValues>;
  // error?: FieldError;
  error?: any;
  control?: any;
  isMulti?: boolean;
  value?: string;
  label?: string;
  SelectValuePlaceholder?: string;
  disabled?: boolean;
  labelClassName?: string;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
  accept?: string;
  required?: boolean;
  FileUploadText?: string;
}

export interface AccountOrderCardProps {
  id: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

export interface AccountAddrCardProps {
  id: number;
  type: string;
  address: string;
  city: string;
  default: boolean;
}

export interface SettingsStateProps {
  key: string;
  title: string;
  description: string;
}

export interface AccountSettingsCardProps extends SettingsStateProps {
  id: number;
  icon: React.ElementType;
}

export interface NotificationSwitchProps {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  last4?: string;
  expiry?: string;
  email?: string;
  accountNumber?: string;
  isDefault: boolean;
  logo: string;
}

export interface ResponsiveDialogDrawerProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile?: boolean;
  trigger: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  showLastTwo?: boolean;
}

export interface CustomDialogDrawerProps extends ResponsiveDialogDrawerProps {
  title?: string;
  description?: string;
}

export interface GenericAllProps {
  value: string;
  title: string;
  description: string;
  tableName: string;
  createTabValue?: string;
  placeholder?: string;
  onEditIdChange?: (id: string | number | null) => void;
  onTabChange?: (val: string) => void;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  refreshKeyProp?: string;
  customFilter?: (rows: any[], currentFilter: string) => any[];
  filterOptions?: { id: number; label: string }[];
  onFilterChange?: (filter: string) => void;
  deleteLocation?: string;
}

export interface DataTableHeaderProps {
  totalItems: number;
  filteredItems: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  filter?: string;
  handleFilterChange?: (value: string) => void;
  filterOptions?: { id: number; label: string }[];
}

export interface DataTableProps<T extends { id: number | string }> {
  title?: string;
  placeholder?: string;
  data: T[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  onRowPatched?: (id: string | number, patch: Partial<T>) => void;
  filter?: string;
  setFilter?: (value: string) => void;
  filterOptions?: { id: number; label: string }[];
  isLoading: boolean;
  error: string;
  deleteLocation?: string;
}

export interface DataTableBodyProps<T> {
  columns: (keyof T)[];
  data: any[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  searchTerm: string;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  onRowPatched?: (id: string | number, patch: Partial<T>) => void;
  deleteLocation?: string;
}

export interface ProductFilterProps {
  filters: {
    searchQuery: string;
    category: string;
    sortBy: string;
    discount: boolean;
    priceRange: number[];
    isFiltersOpen: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onSearchChange: (value: string) => void;
  handleReset: () => void;
  hasActiveFilters: boolean;
  sections?: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginPhoneFormData {
  phone: string;
}

export interface VerifyOtpData {
  phone: string;
  token: string;
  channel: 'sms';
}

export interface SignupPhoneFormData {
  phone: string;
  password: string;
}

export interface signupFormData extends LoginFormData {
  name: string;
  password_confirmation: string;
}

export interface ButtonTrashProps {
  handleClick?: () => void;
  variant?: ButtonVarinats;
  otherClassName?: string;
  ariaLabel?: string;
}

export interface UserInfoProps {
  id: string;
  email: string;
  phone: string;
  display_name: string;
  avatar_url: string;
  role: string;
  created_at: string;
}

export interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  data: UserInfoProps;
  isLoading: boolean;
  uploading: boolean;
}

export interface ProductSkeletonsProps {
  count?: number;
}

export interface RepairServicesProps {
  title?: string;
  subTitle?: React.ReactNode;
  description?: string;
  bntText?: string;
  bgImage: string;
  buttonHref?: string;
  otherClassName?: string;
  padding?: boolean;
}

export interface ProductDetailsInDialogProps {
  productData: any;
  showToast: (message: string, type?: ToastType) => void;
}

export interface MultiSelectInputProps {
  inputName: string;
  control: any;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}

export interface EmptyStateProps {
  imageSrc: string;
  messageText: string;
  buttonText?: string;
  description?: string;
  handleClick?: () => void;
  Icon?: React.ElementType;
  buttonHref?: string | undefined;
}

export interface AttachmentsUploaderProps {
  value: (File | string)[]; // upload => File | edit => string
  onChange: (files: (File | string)[]) => void; // upload => File | edit => string
}

export interface FooterLinksProps {
  secTitle: string;
  listClassName?: string;
  listName: 'followUs' | 'About' | 'myAccount';
  otherClassName?: string;
}

export interface GridWrapperProps {
  children: React.ReactNode;
  otherClassName?: string;
  isScrollable?: boolean;
  gridCols?: string;
  itemClassName?: string;
  disableGridOnMd?: boolean;
}

export interface BackgroundGradientProps {
  opacity?: number;
  showLastTwo?: boolean;
}

export interface CreateUsersTableProps {
  value: string;
  onEditIdChange: (id: string | number | null) => void;
  onTabChange: (val: string) => void;
}

export interface CreateUsersProps {
  id?: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: number;
  password: string;
  role: string;
  avatar_file: File | null; // Selected image file (do not upload here)
  avatar_url: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
}

export interface CardWrapperProps {
  children: React.ReactNode;
  otherClassName?: string;
  contentClassName?: string;
  withFlex?: boolean;
  flexVariant?: flexVariant;
}

export interface VisitorsStatsProps {
  total_visits: number;
  unique_visitors: number;
  today_unique_visitors: number;
}

export interface AuthProvidersStatsProps {
  success: boolean;
  stats: {
    email: number;
    phone: number;
    email_phone: number;
  };
}

export interface ProvidersStatsCardProps {
  iconBgColor: string;
  Icon: React.ElementType;
  name: string;
  value: string | number;
}

export interface AccountTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface AccountInfoCardProps {
  userRole?: string;
  userName?: string;
  userEmail?: string;
  emailVerified?: boolean;
}

export interface StatsItemProps {
  Icon?: React.ElementType;
  dot?: boolean;
  value: number;
  label: string;
}

export interface Message {
  id: string;
  username: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  created_at?: string;
}

export interface MessagesGridProps {
  messages: Message[];
  onDelete?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  isLoading: boolean;
  handleReset: () => void;
}

export interface MessageCardProps {
  message: Message;
  onDelete?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
}

export interface SearchFilterBarProps {
  filters: {
    searchQuery: string;
    filterStatus: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onSearchChange: (value: string) => void;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}

export interface AuthAction {
  type: string;
  payload?: {
    error?: string;
  };
}

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}
