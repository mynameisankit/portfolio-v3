'use client';
import { useFormatter } from 'next-intl';

export function LocalizedDate({ value }: { value: string }) {
  const format = useFormatter();

  return (
    <time dateTime={value}>
      {format.dateTime(new Date(value), { day: 'numeric', month: 'short', year: 'numeric' })}
    </time>
  );
}
