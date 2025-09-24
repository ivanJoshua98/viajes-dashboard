'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {

  const [valueToSearch, setValueToSearch] = useState('');
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleSearch () {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if(valueToSearch !== ''){
      params.set('query', valueToSearch);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          setValueToSearch(e.target.value);
          
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      {<MagnifyingGlassIcon className="cursor-pointer p-2 h-[18px] w-[18px] rounded-md bg-blue-500 absolute left-1 top-1/2 h-[32px] w-[32px] -translate-y-1/2 text-white peer-focus:text-white" 
        onClick={handleSearch}
      /> }
    </div>
  );
}
