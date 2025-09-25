import { fetchTarifas } from "@/app/lib/data/fetchDataTarifas";
import { UpdateTarifa } from "./buttons";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import { formatMoney } from "@/app/lib/utils/formatMoney";

export default async function TarifasTable () {
  
  const tarifas = await fetchTarifas();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-sky-800 p-2 md:pt-0">
          <div className="md:hidden">
            {tarifas?.map((tarifa) => (
              <div
                key={tarifa.id}
                className="mb-2 w-full rounded-md bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <DocumentCurrencyDollarIcon className="mr-2 rounded-full h-8 w-8"/>
                      <p className="text-sm text-gray-50">{tarifa.zona_nombre}</p>
                    </div>
                    <p className="text-sm text-gray-50">{tarifa.tipo}</p>
                    <p className="text-sm text-gray-50">${formatMoney(tarifa.monto_centavos)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateTarifa id={tarifa.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-50 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium text-white sm:pl-6">
                  
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Zona
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Tipo de camión
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Monto
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3 text-white">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {tarifas?.map((tarifa) => (
                <tr
                  key={tarifa.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <DocumentCurrencyDollarIcon className="rounded-full h-8 w-8"/>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {tarifa.zona_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {tarifa.tipo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${formatMoney(tarifa.monto_centavos)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTarifa id={tarifa.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}