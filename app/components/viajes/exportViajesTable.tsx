'use client';

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/components/button"
import { formatDate } from "@/app/lib/utils/formatDateToLocal";
import * as XLSX from 'xlsx';
import { Viaje } from "@/app/lib/data/definitions";
import { formatMoney } from "@/app/lib/utils/formatMoney";

export default function exportViajesTable ( { viajes }: { viajes: Viaje[] } ) {

  // function exportTable () { 
  //   const table = document.getElementById('report-viajes-table')?.outerHTML;
  //   if ( table ){
  //     const url = 'data:application/vnd.ms-excel,' + encodeURIComponent(table);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `viajes-reporte-${formatDate(new Date)}.xls`;
  //     a.click();
  //   }
  // }

function exportViajes(viajes: Viaje[]) {
  const data = viajes.map((viaje) => ({
    Fecha: formatDate(viaje.fecha),
    Zona: viaje.zona_nombre,
    'Tipo de camión': viaje.tipo_camion_nombre,
    Cajones: viaje.cajones,
    Clientes: viaje.cant_clientes,
    'Valor del flete': Number((viaje.valor_flete_centavos / 100).toFixed(2)),
    Observaciones: viaje.observaciones,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const totalRows = data.length + 1; // +1 por encabezado
  const totalRowIndex = totalRows + 2;
  const facturadoRowIndex = totalRowIndex + 1;
  const netoRowIndex = facturadoRowIndex + 1;

  // Total (suma de la columna F)
  worksheet[`F${totalRowIndex}`] = {
    t: 'n',
    f: `SUM(F2:F${totalRows})`, // =SUM(F2:F10)
  };
  worksheet[`E${totalRowIndex}`] = { t: 's', v: 'Total' };

  // Facturado (celda vacía para completar)
  worksheet[`E${facturadoRowIndex}`] = { t: 's', v: 'Facturado' };

  // Neto N2 = Total - Facturado
  worksheet[`F${netoRowIndex}`] = {
    t: 'n',
    f: `F${totalRowIndex} - F${facturadoRowIndex}`, 
  };
  worksheet[`E${netoRowIndex}`] = { t: 's', v: 'Neto N2' };

  // Se agrega un ancho personalizado a las columnas
  worksheet['!cols'] = [
    { wch: 12 }, // 12 caracteres de ancho
    { wch: 12 }, 
    { wch: 16 }, 
    { wch: 12 }, 
    { wch: 12 }, 
    { wch: 22 }, 
    { wch: 30}
  ];

  // Actualizar el rango de celdas de la hoja
  const range = XLSX.utils.decode_range(worksheet['!ref'] || '');
  range.e.r = netoRowIndex - 1;
  worksheet['!ref'] = XLSX.utils.encode_range(range);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Viajes');

  XLSX.writeFile(workbook, `viajes-reporte-${formatDate(new Date())}.xlsx`);
}

  return (
    <div className="mb-4 self-end">
        <Button 
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={ () => exportViajes(viajes) }
        >
          <span className="hidden md:block">Descargar</span>{' '}
          <ArrowDownTrayIcon className="h-5 md:ml-4" />
        </Button>   
    </div>
  )
}