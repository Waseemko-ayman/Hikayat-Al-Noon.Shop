import { OrderProps } from '@/interfaces';
import { Check, Circle, Clock, RotateCcw, X } from 'lucide-react';

export const getStatusColor = (status: OrderProps['status']) => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'pending':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'failed':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'refunded':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const getStatusIcon = (status: OrderProps['status']) => {
  switch (status) {
    case 'paid':
      return <Check className="w-4 h-4 text-green-600" />;

    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;

    case 'failed':
      return <X className="w-4 h-4 text-red-600" />;

    case 'refunded':
      return <RotateCcw className="w-4 h-4 text-blue-600" />;

    default:
      return <Circle className="w-3 h-3 text-gray-400" />;
  }
};
