'use client';

import { formatDate } from '@/app/lib/utils/formatDateToLocal';
import { CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/components/button';

export default function DatesInput() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleSearch () {
    const params = new URLSearchParams(searchParams);
    params.set('startDate', formatDate(new Date()));
    params.set('endDate', formatDate(new Date()));
    if(startDate !== ''){
      params.set('startDate', startDate);
    } 
    if(endDate !== ''){
      params.set('endDate', endDate);
    } 
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">

      {/* Start date */}
      <div className="mb-4">
        <label htmlFor="start-date" className="mb-2 block text-sm font-medium">
          Fecha de inicio
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="start-date"
              name="start-date"
              type="date"
              defaultValue={ formatDate(new Date()) }
              onChange={(e) => setStartDate(formatDate(new Date(e.target.value)))}
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
            /> 
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
        </div>
      </div>

      {/* End date */}
      <div className="mb-4 ml-4">
        <label htmlFor="end-date" className="mb-2 block text-sm font-medium">
          Fecha final
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="end-date"
              name="end-date"
              type="date"
              defaultValue={formatDate(new Date())}
              onChange={(e) => setEndDate(formatDate(new Date(e.target.value)))}
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
            /> 
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
        </div>
      </div>

      {/* Button search */}
      <div className="mb-4 ml-4 self-end">
          <Button 
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={ handleSearch }
          >
            <span className="hidden md:block">Buscar viajes</span>{' '}
            <MagnifyingGlassIcon className="h-5 md:ml-4" />
          </Button>   
      </div>
    </div>
  );
}
