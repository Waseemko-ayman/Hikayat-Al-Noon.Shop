import { StatsItemProps } from '@/interfaces';

const StatsItem = ({ Icon, dot, value, label }: StatsItemProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5">
      {dot ? (
        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
      ) : (
        Icon && <Icon className="h-4 w-4 text-white/90" />
      )}
      <span className="text-sm font-medium">{value}</span>
      <span className="text-sm text-white/80">{label}</span>
    </div>
  );
};

export default StatsItem;
