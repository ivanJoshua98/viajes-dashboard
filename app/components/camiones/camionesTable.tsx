import { UpdateCamion } from '@/app/components/camiones/buttons';
import { fetchCamiones } from '@/app/lib/data/fetchDataCamiones';
import { TruckIcon } from '@heroicons/react/24/outline';
import { DeleteCamion } from '@/app/components/camiones/deleteButton';

export default async function CamionesTable() {
  
  const camiones = await fetchCamiones();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-sky-800 p-2 md:pt-0">
          <div className="md:hidden">
            {camiones?.map((camion) => (
              <div
                key={camion.id}
                className="mb-2 w-full rounded-md bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <TruckIcon className="mr-2 rounded-full h-12 w-12"/>
                    </div>
                    <p className="text-sm text-gray-50">{camion.patente}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateCamion id={camion.id} />
                    <DeleteCamion id={camion.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-50 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium text-white sm:pl-6">
                  Camion
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Patente
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3 text-white">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {camiones?.map((camion) => (
                <tr
                  key={camion.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <TruckIcon className="rounded-full h-12 w-12"/>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {camion.patente}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCamion id={camion.id} />
                      <DeleteCamion id={camion.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
