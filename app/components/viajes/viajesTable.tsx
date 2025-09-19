import { fetchViajes } from "@/app/lib/data/fetchDataViajes";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { UpdateViaje } from "@/app/components/viajes/buttons";
import { formatMoney } from "@/app/lib/utils/formatMoney";
import { formatDateToLocal } from "@/app/lib/utils/formatDateToLocal";

export default async function ViajesTable () {
  
  const viajes = await fetchViajes();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-sky-800 p-2 md:pt-0 md:mr-12">
          <div className="md:hidden">
            {viajes?.map((viaje) => (
              <div
                key={ viaje.viaje_id }
                className="mb-2 w-full rounded-md bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <PencilSquareIcon className="mr-2 rounded-full h-12 w-12"/>
                      <p className="text-sm text-gray-50">{ formatDateToLocal(viaje.fecha) }</p>
                    </div>
                    <p className="text-sm text-gray-50">{ viaje.zona_nombre }</p>
                    <p className="text-sm text-gray-50">${ viaje.tipo_camion_nombre }</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      { viaje.cajones }
                    </p>
                    <p>{ viaje.cant_clientes }</p>
                    <p>{ formatMoney(viaje.valor_flete_centavos) }</p>
                    <p>{ viaje.observaciones }</p>
                    <p>{ viaje.camion_patente }</p>
                    <p>{ viaje.litros_combustible }</p>
                    <p>{ viaje.kilometraje }</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateViaje id={ viaje.viaje_id } />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-50 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Zona
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Tipo de camión
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Cajones
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Clientes 
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Valor del flete
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Observaciones
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Camión
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Litros de combustible
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Kilometraje
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3 text-white">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {viajes?.map((viaje) => (
                <tr
                  key={viaje.viaje_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    { formatDateToLocal(viaje.fecha) }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {viaje.zona_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.tipo_camion_nombre }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.cajones }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.cant_clientes }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${formatMoney(viaje.valor_flete_centavos)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.observaciones }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.camion_patente }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.litros_combustible } l
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { viaje.kilometraje } km
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateViaje id={ viaje.viaje_id } />
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