import { fetchLatestViajes } from '@/app/lib/data/fetchDataViajes';
import { formatDate } from '@/app/lib/utils/formatDateToLocal';
import { formatMoney } from '@/app/lib/utils/formatMoney';
import { ArrowPathIcon, TruckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default async function LatestViajes () {

  const latestViajes = await fetchLatestViajes();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={'mb-4 text-xl md:text-2xl'}>
        Ultimos viajes
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-800 p-4">
        { <div className="bg-gray-600 px-6">
          {latestViajes.map((viaje, i) => {
            return (
              <div
                key={viaje.viaje_id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <TruckIcon className="mr-4 rounded-full h-8 w-8" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {formatDate(viaje.fecha)}
                    </p>
                    <p className="hidden text-sm text-gray-50 sm:block">
                      {viaje.zona_nombre}
                    </p>
                  </div>
                </div>
                <p
                  className={'truncate text-sm font-medium md:text-base'}
                >
                  ${formatMoney(viaje.valor_flete_centavos)}
                </p>
              </div>
            );
          })}
        </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-50" />
          <h3 className="ml-2 text-sm text-gray-50 ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  );
}
