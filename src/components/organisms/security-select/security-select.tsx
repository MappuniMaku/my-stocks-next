'use client';

import { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'ts-debounce';
import { getSecurities, isStringNotEmpty } from '@/helpers';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { ISecurity } from '@types';

export const SecuritySelect: FC = () => {
  const router = useRouter();

  const [securities, setSecurities] = useState<ISecurity[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadSecurities = async (query: string) => {
    try {
      setIsLoading(true);
      const result = await getSecurities(query, 10);
      setSecurities(result);
    } catch (err) {
      console.error('Failed to load securities', err);
      setSecurities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedLoadSecurities = useMemo(() => debounce(loadSecurities, 500), []);

  const handleSearch = async (v: string) => {
    setSearch(v);
    if (isStringNotEmpty(v)) {
      debouncedLoadSecurities(v);
    }
  };

  const handleSelect = (ticker: string | number) => {
    router.push(`/securities/${ticker}`);
  };

  return (
    <Autocomplete
      label="Найти ценную бумагу"
      placeholder="Введите запрос"
      inputValue={search}
      items={securities}
      isLoading={isLoading}
      onInputChange={handleSearch}
      onSelectionChange={handleSelect}
    >
      {(item) => <AutocompleteItem key={item.secid}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
};
