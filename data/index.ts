import {
  ActionItem,
  FormValues,
  OrderProps,
  PaymentMethod,
  ProvidersStatsProps,
} from '@/interfaces';
import { PATHS } from './paths';
import {
  FaBox,
  FaCartShopping,
  FaClock,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMap,
  FaPhone,
  FaStar,
  FaTelegram,
  FaTwitter,
  FaUser,
} from 'react-icons/fa6';
import {
  FiLogOut,
  FiMail,
  FiMessageCircle,
  FiShoppingCart,
  FiUsers,
} from 'react-icons/fi';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Cookie,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  Lock,
  Mail,
  MessageCircleQuestion,
  Package,
  RotateCcw,
  Ruler,
  Settings,
  Shield,
  ShoppingBag,
  Tag,
  Truck,
  User,
  Users,
  XCircle,
} from 'lucide-react';
import { FaShippingFast, FaTachometerAlt } from 'react-icons/fa';
import { formatDate } from '@/utils/formateDate';
import { formatPrice } from '@/utils/formatPrice';

export const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Shop', link: PATHS.SHOP.ROOT },
  { name: 'Blog', link: PATHS.BLOG },
  { name: 'About', link: PATHS.ABOUT },
  { name: 'Contact', link: PATHS.CONTACT },
  { name: 'Cart', link: PATHS.CART },
  { name: 'Login', link: PATHS.AUTH.LOGIN },
];

export const FETURES = [
  {
    id: 1,
    title: 'Free Shipping',
    image: '/assets/features/Free shipping-bro.svg',
    bgColor: 'bg-[#92e3a99d]',
  },
  {
    id: 2,
    title: 'Online Order',
    image: '/assets/features/Order ahead-amico.svg',
    bgColor: 'bg-[#c786d396]',
  },
  {
    id: 3,
    title: 'Save Money',
    image: '/assets/features/E-Wallet-bro.svg',
    bgColor: 'bg-[#92e2e3]',
  },
  {
    id: 4,
    title: 'Promotions',
    image: '/assets/features/Shop giveaway-rafiki.svg',
    bgColor: 'bg-[#407cff91]',
  },
  {
    id: 5,
    title: 'Happy Sell',
    image: '/assets/features/Self confidence-bro.svg',
    bgColor: 'bg-[#bdc1c3]',
  },
  {
    id: 6,
    title: 'F24/7 Support',
    image: '/assets/features/Service 24_7-bro.svg',
    bgColor: 'bg-[#edc5c5]',
  },
];

export const FOOTER_LINKS_DATA = {
  Contact: [
    {
      id: 1,
      text: 'Address',
      info: 'Occupied Palestine, Gaza',
    },
    {
      id: 2,
      text: 'Phone',
      info: '+972592164680',
    },
    {
      id: 3,
      text: 'Whats app',
      info: '+972592164680',
    },
  ],
  followUs: [
    {
      id: 1,
      url: 'https://github.com/Waseemko-ayman',
      icon: FaGithub,
      ariaLabel: 'Visit my GitHub profile',
    },
    {
      id: 2,
      url: 'https://twitter.com/waseemabdalhady',
      icon: FaTwitter,
      ariaLabel: 'Visit my Twitter profile',
    },
    {
      id: 3,
      url: 'https://www.linkedin.com/in/waseem-abd-elhadi-1b293624b/',
      icon: FaLinkedin,
      ariaLabel: 'Visit my LinkedIn profile',
    },
    {
      id: 4,
      url: 'https://www.instagram.com/waseem.abdalhady/',
      icon: FaInstagram,
      ariaLabel: 'Visit my Instagram profile',
    },
    {
      id: 5,
      url: 'https://t.me/waseem_abdalhady',
      icon: FaTelegram,
      ariaLabel: 'Visit my Telegram profile',
    },
    {
      id: 6,
      url: 'mailto:wasimabdelhadi78@gmail.com',
      icon: FaEnvelope,
      ariaLabel: 'Send me an email',
    },
  ],
  About: [
    {
      id: 1,
      url: PATHS.ABOUT,
      text: 'About Us',
    },
    {
      id: 2,
      url: PATHS.PRIVACY_POLICY,
      text: 'Privacy Policy',
    },
    {
      id: 3,
      url: PATHS.CONTACT,
      text: 'Contact Us',
    },
    {
      id: 4,
      url: PATHS.FAQ,
      text: 'FAQ',
    },
  ],
  myAccount: [
    {
      id: 1,
      url: PATHS.AUTH.LOGIN,
      text: 'Sign In',
    },
    {
      id: 2,
      url: PATHS.CART,
      text: 'View Cart',
    },
    {
      id: 3,
      url: PATHS.HELP,
      text: 'Help',
    },
  ],
};

export const NEVER_READ = [
  {
    id: 1,
    src: 'b1.webp',
    imgTitle: 'The Cotton - Jersy Zip - Up hoodie',
    title: 'The Cotton - Jersy Zip - Up hoodie',
    description:
      'Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr walf chartreuse hexagan irony. godard_',
    beforeContent: '13/01',
  },
  {
    id: 2,
    src: 'b2.webp',
    imgTitle: 'How to Style a Quiff',
    title: 'How to Style a Quiff',
    description:
      'Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr walf chartreuse hexagan irony. godard_',
    beforeContent: '13/04',
  },
  {
    id: 3,
    src: 'b3.webp',
    imgTitle: 'Must - Have Skater girl Items',
    title: 'Must - Have Skater girl Items',
    description:
      'Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr walf chartreuse hexagan irony. godard_',
    beforeContent: '12/01',
  },
  {
    id: 4,
    src: 'b4.webp',
    imgTitle: 'Runway - Inspired Trends',
    title: 'Runway - Inspired Trends',
    description:
      'Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr walf chartreuse hexagan irony. godard_',
    beforeContent: '16/01',
  },
];

export const CONTACT_DATA = [
  {
    id: 1,
    icon: FaMap,
    community: 'Occupied Palestine, Gaza',
  },
  {
    id: 2,
    icon: FaEnvelope,
    community: 'wasimabdelhadi78@gmail.com',
  },
  {
    id: 3,
    icon: FaPhone,
    community: '+972592164680',
  },
  {
    id: 4,
    icon: FaClock,
    community: 'Monday to Saturday: 9:00am to 16:00pm',
  },
];

export const INPUT_TYPE: {
  id: number;
  type: 'text' | 'email' | 'textarea';
  name: keyof FormValues;
  placeholder: string;
}[] = [
  {
    id: 1,
    type: 'text',
    name: 'username',
    placeholder: 'Your Name',
  },
  {
    id: 2,
    type: 'email',
    name: 'email',
    placeholder: 'E-mail',
  },
  {
    id: 3,
    type: 'text',
    name: 'subject',
    placeholder: 'Subject',
  },
  {
    id: 4,
    type: 'textarea',
    name: 'message',
    placeholder: 'Your Message',
  },
];

export const loginInputs = [
  {
    id: 1,
    label: 'Email Address',
    type: 'email',
    name: 'email',
    placeholder: 'you@example.com',
  },
  {
    id: 2,
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
  },
];

export const loginPhoneInputs = [
  {
    id: 1,
    label: 'Phone Number',
    type: 'phone',
    name: 'phone',
    placeholder: '+97059xxxxxxx',
  },
];

export const signupPhoneInputs = [
  {
    id: 1,
    label: 'Phone Number',
    type: 'phone',
    name: 'phone',
    placeholder: '+97059xxxxxxx',
  },
  {
    id: 2,
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
  },
];

export const signupInputs = [
  {
    id: 1,
    label: 'Username',
    type: 'text',
    name: 'name',
    placeholder: 'Your Name',
  },
  {
    id: 2,
    label: 'Email Address',
    type: 'email',
    name: 'email',
    placeholder: 'you@example.com',
  },
  {
    id: 3,
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
  },
  {
    id: 4,
    type: 'password',
    label: 'Password Confirmation',
    name: 'password_confirmation',
    placeholder: 'repassword',
  },
];

export const resetInputs = [
  {
    id: 1,
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
  },
  {
    id: 2,
    type: 'password',
    label: 'Password Confirmation',
    name: 'password_confirmation',
    placeholder: 'repassword',
  },
];

export const userList = [
  { id: 1, title: 'My Account', link: PATHS.MY_ACCOUNT, icon: FaUser },
  {
    id: 2,
    title: 'Dashboard',
    link: PATHS.DASHBOARD.ROOT,
    icon: FaTachometerAlt,
  },
  {
    id: 3,
    title: 'Orders',
    link: PATHS.ORDERS.ROOT,
    icon: FaCartShopping,
  },
  {
    id: 4,
    title: 'logout',
    icon: FiLogOut,
  },
];

export const userInfoButtons = [
  {
    id: 1,
    icon: User,
    text: 'Profile',
  },
  // {
  //   id: 3,
  //   icon: MapPin,
  //   text: 'Addresses',
  // },
  {
    id: 3,
    icon: Settings,
    text: 'Settings',
  },
];

export const profileSecInputs = [
  {
    id: 1,
    type: 'text',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Enter first name',
  },
  {
    id: 2,
    type: 'text',
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Enter last name',
  },
  {
    id: 3,
    type: 'email',
    label: 'Email Address',
    name: 'email',
    placeholder: 'your@example.com',
  },
  {
    id: 4,
    type: 'tel',
    label: 'Phone Number',
    name: 'phone',
    placeholder: '+1xxxxxxxxxxx',
  },
];

export const SettingsData = [
  {
    id: 1,
    title: 'Email Notifications',
    key: 'emailNotifications',
    description: 'Receive updates about your orders',
    icon: Bell,
  },
  {
    id: 2,
    key: 'password',
    title: 'Password',
    description: 'Change your password',
    icon: Lock,
  },
  {
    id: 3,
    key: 'paymentMethods',
    title: 'Payment Methods',
    description: 'Manage your saved payment options',
    icon: CreditCard,
  },
];

export const passSettingsInputs = [
  {
    id: 1,
    label: 'Current Password',
    type: 'password',
    name: 'currentPassword',
    placeholder: 'Enter current password',
  },
  {
    id: 2,
    label: 'New Password',
    type: 'password',
    name: 'newPassword',
    placeholder: 'Enter new password',
  },
  {
    id: 3,
    label: 'Confirm New Password',
    type: 'password',
    name: 'confirmNewPassword',
    placeholder: 'Confirm new password',
  },
];

export const initialNotifications = [
  {
    id: 'order-updates',
    label: 'Order updates',
    desc: 'Get notified about your order status and shipping',
    value: true,
  },
  {
    id: 'security-alerts',
    label: 'Security alerts',
    desc: 'Important notifications about your account security',
    value: true,
  },
  {
    id: 'marketing',
    label: 'Marketing & promotional emails',
    desc: 'Receive updates about new features and special offers',
    value: false,
  },
];

export const paymentMethodsData: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Visa ending in 4242',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
    logo: '💳',
  },
  {
    id: '2',
    type: 'card',
    name: 'Mastercard ending in 8888',
    last4: '8888',
    expiry: '09/26',
    isDefault: false,
    logo: '💳',
  },
  {
    id: '3',
    type: 'paypal',
    name: 'PayPal',
    email: 'user@example.com',
    isDefault: false,
    logo: '🅿️',
  },
  {
    id: '4',
    type: 'bank',
    name: 'Bank Account',
    accountNumber: '****1234',
    isDefault: false,
    logo: '🏦',
  },
];

export const sidebarLinks = [
  {
    title: 'Hikayat Al-Noon',
    href: PATHS.HOME,
    icon: Home,
  },
  {
    title: 'Dashboard',
    href: PATHS.DASHBOARD.ROOT,
    icon: FaTachometerAlt,
  },
  {
    title: 'Products',
    href: PATHS.DASHBOARD.PRODUCTS,
    icon: FaBox,
  },
  {
    title: 'Newsletter',
    href: PATHS.DASHBOARD.NEWSLETTER,
    icon: FiMail,
  },
  {
    title: 'Users',
    href: PATHS.DASHBOARD.USERS,
    icon: FiUsers,
  },
  {
    title: 'Contact Messages',
    href: PATHS.DASHBOARD.CONTACT_MESSAGES,
    icon: FiMessageCircle,
  },
  {
    title: 'Ratings',
    href: PATHS.DASHBOARD.RATINGS,
    icon: FaStar,
  },
  {
    title: 'Orders',
    href: PATHS.DASHBOARD.ORDERS.ROOT,
    icon: FiShoppingCart,
  },
  {
    title: 'FAQ',
    href: PATHS.DASHBOARD.FAQ,
    icon: MessageCircleQuestion,
  },
  {
    title: 'Settings',
    href: PATHS.DASHBOARD.SETTINGS,
    icon: Settings,
  },
];

export const BANNERS_DATA = [
  {
    id: 1,
    bgImage: '/assets/banner/b4.webp',
    subTitle: 'big sale',
    title: 'up to 40% off',
    description: 'Grab your favorite items at discounted prices',
    btnText: 'Shop Now',
    type: 'big',
    overlay: false,
    query: '?discount=true',
  },
  {
    id: 2,
    bgImage: '/assets/banner/b3.webp',
    subTitle: 'spring/summer',
    title: 'upcomming season',
    description: 'The best classic dress is on sale at cara',
    btnText: 'Collection',
    type: 'big',
    overlay: false,
    query: `?category=tshirts_summer`,
  },
  {
    id: 3,
    bgImage: '/assets/banner/b5.webp',
    subTitle: 'Seasonal sale',
    title: 'Winter Collection -50% Off',
    type: 'small',
    overlay: true,
  },
  {
    id: 4,
    bgImage: '/assets/banner/b6.webp',
    subTitle: 'New Footwear Collection',
    title: 'Spring/Summer 2023',
    type: 'small',
    overlay: true,
  },
  {
    id: 5,
    bgImage: '/assets/banner/b7.webp',
    subTitle: 'T-Shirt',
    title: 'New Trandy Prinls',
    type: 'small',
    overlay: true,
  },
];

export const MyOrderStatuses = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Completed' },
  { id: 3, label: 'Pending' },
  { id: 4, label: 'Cancelled' },
  { id: 5, label: 'Paid' },
  { id: 6, label: 'Processing' },
];

export const PrivacyPolicyContent = [
  {
    id: 1,
    Icon: FileText,
    title: 'Information We Collect',
    description: 'We collect information to provide better services:',
    items: [
      'Personal details such as name, email, and address',
      'Order and payment information',
      'Browsing data such as IP address and cookies',
    ],
  },
  {
    id: 2,
    Icon: Users,
    title: 'How We Use Your Information',
    items: [
      'Process and deliver orders',
      'Provide customer support',
      'Improve our website and services',
      'Send optional promotional content',
    ],
  },
  {
    id: 3,
    Icon: Lock,
    title: 'Data Protection',
    description:
      'We apply industry-standard security measures to protect your data from unauthorized access or misuse.',
  },
  {
    id: 4,
    Icon: Cookie,
    title: 'Cookies',
    description:
      'Cookies enhance your experience. You can disable them through browser settings, though some features may not work properly.',
  },
  {
    id: 5,
    Icon: Shield,
    title: 'Third-Party Services',
    description:
      'We share data only with trusted services such as payment and shipping providers, strictly for order fulfillment.',
  },
  {
    id: 6,
    Icon: Users,
    title: 'Your Rights',
    description:
      'You may request access, correction, or deletion of your data at any time. We respond within a reasonable period.',
  },
  {
    id: 7,
    Icon: Mail,
    title: 'Contact Us',
    description: 'For questions about this policy, contact us at ',
    link: true,
  },
];

export const HelpContent = [
  {
    id: 1,
    Icon: FaShippingFast,
    title: 'How long does delivery take?',
    description:
      'Delivery times vary by location. Estimated delivery details are available on the Delivery Information page.',
  },
  {
    id: 2,
    Icon: RotateCcw,
    title: 'Can I return an item?',
    description: 'Yes, items can be returned according to our Refund Policy.',
  },
  {
    id: 3,
    Icon: CreditCard,
    title: 'What payment methods do you accept?',
    description:
      'We accept secure online payment methods available at checkout.',
  },
  {
    id: 4,
    Icon: Ruler,
    title: 'How do I choose the right size?',
    description:
      'Please refer to the size guide available on each product page.',
  },
  {
    id: 5,
    Icon: Mail,
    title: 'Still need help? Our support team is happy to assist you.',
    description: 'Still need help? Our support team is happy to assist you.',
    link: true,
  },
];

export const rolesOptions = [
  { id: 'ADMIN', name: 'Admin' },
  { id: 'USER', name: 'User' },
];

export const CreateUsersFields = [
  ...profileSecInputs,
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    id: 'role',
    name: 'role',
    label: 'Role',
    placeholder: 'Select role',
    type: 'select',
  },
  {
    id: 'avatar_file',
    name: 'avatar_file',
    label: 'Image',
    placeholder: 'Add Image',
    type: 'file',
  },
];

export const ProductReviewsTabsData = [
  { value: 'comments', label: 'Comments' },
  { value: 'ratingsSummary', label: 'Ratings Summary' },
];

export const TroubleshootingTips = [
  {
    id: 1,
    text: 'Check your card details and expiration date',
  },
  {
    id: 2,
    text: 'Ensure you have sufficient funds available',
  },
  {
    id: 3,
    text: 'Try a different payment method',
  },
  {
    id: 4,
    text: 'Contact your bank if the issue persists',
  },
];

export const statusConfig = {
  paid: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-700 border-green-200',
  },
  completed: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-700 border-green-200',
  },
  pending: {
    icon: Clock,
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  failed: {
    icon: XCircle,
    className: 'bg-red-50 text-red-700 border-red-200',
  },
};

export const OrderSummaryCard = ({ order }: { order: OrderProps }) => [
  {
    id: 1,
    title: 'Date',
    icon: Calendar,
    value: formatDate(order?.created_at),
  },
  {
    id: 2,
    title: 'Total',
    icon: CreditCard,
    value: formatPrice(order?.amount),
  },
  {
    id: 3,
    title: 'Items',
    icon: Package,
    value: order.order_items?.length || 0,
  },
  {
    id: 4,
    title: 'Delivery',
    icon: Truck,
    value:
      (order?.order_items?.[0]?.shipping ?? 0 > 0)
        ? formatPrice(order?.order_items?.[0]?.shipping ?? 0)
        : 'Free Shipping',
  },
];

export const FOOTER_SUMMARY = (order: OrderProps) => [
  {
    id: 1,
    title: 'Subtotal',
    value: formatPrice(order?.order_items?.[0]?.subtotal ?? 0),
  },
  {
    id: 2,
    title: 'Shipping',
    value:
      (order?.order_items?.[0]?.shipping ?? 0 > 0)
        ? formatPrice(order?.order_items?.[0]?.shipping ?? 0)
        : 'Free',
  },
  {
    id: 3,
    title: 'Total Paid',
    value: formatPrice(order.amount),
  },
];

export const AuthProvidersStatsItems = (stats: ProvidersStatsProps) => [
  {
    name: 'Email',
    value: stats.email,
    icon: FaEnvelope,
    color: 'bg-blue-500',
  },
  {
    name: 'Phone',
    value: stats.phone,
    icon: FaPhone,
    color: 'bg-green-500',
  },
  {
    name: 'Email & Phone',
    value: stats.email_phone,
    icon: FaUser,
    color: 'bg-purple-500',
  },
];

export const paymentCheckoutInput = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    placeholder: 'Cardholder Name',
  },
  {
    id: 2,
    name: 'email',
    type: 'email',
    placeholder: 'Email Address',
  },
];

export const shippingSettingsInputs = [
  {
    id: 1,
    label: 'Shipping Cost',
    type: 'number',
    name: 'shipping',
    placeholder: '0.00',
    icon: DollarSign,
  },
  {
    id: 2,
    label: 'Free Shipping Minimum',
    type: 'number',
    name: 'free_shipping_min',
    placeholder: '0.00',
    icon: Tag,
  },
];

export const SuccessPageActions: ActionItem[] = [
  {
    label: 'Continue Shopping',
    href: PATHS.HOME,
    icon: ShoppingBag,
    variant: 'primary',
  },
  {
    label: 'View Order',
    href: PATHS.ORDERS.ROOT,
    icon: ArrowRight,
    variant: 'secondary',
  },
];

export const FailedPageActions: ActionItem[] = [
  {
    label: 'Try Again',
    href: PATHS.HOME,
    icon: AlertCircle,
    variant: 'primary',
  },
  {
    label: 'Back to Shopping',
    href: PATHS.SHOP.ROOT,
    icon: ArrowLeft,
    variant: 'secondary',
  },
];

export const faqCategories = [
  { id: 'orders', label: 'Orders' },
  { id: 'payments', label: 'Payments' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'general', label: 'General' },
];

export const HeroStats = (avgRating: number) => [
  {
    title: 'Personal Project',
    subtitle: 'Built with Next.js & TypeScript',
  },
  {
    title: 'UI/UX Focused',
    subtitle: 'Responsive & Modern Design',
    className: 'hidden sm:block',
  },
  {
    title: avgRating.toString() ?? 4.5,
    subtitle: 'Design Quality Rating',
  },
];
