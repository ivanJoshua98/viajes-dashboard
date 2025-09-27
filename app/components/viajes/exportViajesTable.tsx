'use client';

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/components/button"
import { formatDate } from "@/app/lib/utils/formatDateToLocal";

export default function exportViajesTable () {

  function exportTable () {
    const table = document.getElementById('report-viajes-table')?.outerHTML;
    if ( table ){
      const url = 'data:application/vnd.ms-excel,' + encodeURIComponent(table);
      const a = document.createElement('a');
      a.href = url;
      a.download = `viajes-reporte-${formatDate(new Date)}.xls`;
      a.click();
    }
  }

  return (
    <div className="mb-4 self-end">
        <Button 
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={ exportTable }
        >
          <span className="hidden md:block">Descargar</span>{' '}
          <ArrowDownTrayIcon className="h-5 md:ml-4" />
        </Button>   
    </div>
  )
}