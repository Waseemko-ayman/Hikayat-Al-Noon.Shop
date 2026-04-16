/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const renderCell = (col: any, row: any) => {
  const columnKey = String(col);
  const rawValue = row[col];

  if (columnKey === 'id' || columnKey === 'order_id') {
    const value = String(row.id);
    return (
      <div title={value}>{value.slice(0, 8) + '...' + value.slice(-4)}</div>
    );
  }

  if (columnKey === 'status') {
    return (
      <div className="flex items-center justify-center gap-1 p-2 rounded-xl">
        {String(rawValue)}
      </div>
    );
  }

  if (columnKey === 'gallery' && Array.isArray(rawValue)) {
    if (rawValue.length === 0) return 'unavailable';
    return rawValue.length > 1 ? (
      <div className="flex items-center flex-wrap gap-1 justify-center">
        {rawValue.map((img: string, idx: number) => (
          <Image
            key={idx}
            src={img || '/assets/no-image-available.webp'}
            alt={`image-${idx}`}
            width={80}
            height={80}
            className="w-[80px] h-[80px] object-cover rounded-md border border-gray-200"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).style.display = 'none')
            }
            unoptimized
          />
        ))}
      </div>
    ) : (
      <Image
        src={rawValue[0] || '/assets/no-image-available.webp'}
        alt="image"
        width={100}
        height={100}
        className="mx-auto rounded-md border border-gray-200"
      />
    );
  }

  if (
    (columnKey === 'image' ||
      columnKey === 'photo' ||
      columnKey === 'avatar_url') &&
    typeof rawValue === 'string'
  ) {
    return (
      <Image
        src={rawValue || '/assets/no-image-available.webp'}
        alt={columnKey}
        width={100}
        height={100}
        className={`object-cover border border-gray-200 ${columnKey === 'avatar_url' ? 'mx-auto rounded-full w-[70px] md:w-[80px] h-[70px] md:h-[80px]' : 'rounded-md w-[100px] h-[100px]'}`}
      />
    );
  }

  const cellValue =
    rawValue == null || rawValue === ''
      ? 'unavailable'
      : Array.isArray(rawValue)
        ? rawValue.join(', ')
        : rawValue;

  if (columnKey === 'created_at' || columnKey === 'last_sign_in_at') {
    const date = new Date(cellValue);

    if (columnKey === 'last_sign_in_at' && isNaN(date.getTime())) {
      return 'Not Email verified';
    }

    if (isNaN(date.getTime())) return 'unavailable';

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: enUS,
    });
  }

  return String(cellValue);
};
