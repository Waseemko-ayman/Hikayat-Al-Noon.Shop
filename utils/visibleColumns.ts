/* eslint-disable @typescript-eslint/no-explicit-any */
export const getVisibleColumns = <T extends Record<string, any>>(
  columns: (keyof T | string)[],
  data: T[],
): (keyof T | string)[] => {
  return columns.reduce<(keyof T | string)[]>((acc, col) => {
    if (
      col === 'updated_at' ||
      col === 'user_id' ||
      col === 'slug' ||
      col === 'stripe_payment_intent'
    )
      return acc;

    const sampleValue = data.find((item) => item[col] != null)?.[col];

    if (col === 'user' && sampleValue && typeof sampleValue === 'object') {
      return [...acc, ...Object.keys(sampleValue).map((key) => `user_${key}`)];
    }

    if (
      sampleValue &&
      typeof sampleValue === 'object' &&
      ('ar' in sampleValue || 'en' in sampleValue)
    ) {
      return [...acc, `${String(col)}_ar`, `${String(col)}_en`];
    }

    return [...acc, col];
  }, []);
};
