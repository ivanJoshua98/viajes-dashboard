'use client';

import { StateTarifaForm, updateTarifa } from "@/app/lib/actions/tarifaAction";
import { Tarifa } from "@/app/lib/data/definitions";
import { CurrencyDollarIcon, FlagIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useActionState } from "react";
import { Button } from "../button";

export default function EditTarifaForm ( { tarifa }: { tarifa: Tarifa }) {

  const initialState: StateTarifaForm = { message: null, errors: {} };
  const updateTarifaWithId = updateTarifa.bind(null, tarifa.id);
  const [state, formAction] = useActionState(updateTarifaWithId, initialState);

  function resetAlert () {
    state.message = '';
  }

  return (
    <form action={ formAction } onChange={ resetAlert }>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">

        {/* Zona */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Zona
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <p id="zona"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline"
              >{tarifa.zona_nombre}</p>
              <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Tipo de camión
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <p id="tipo"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline"
              >{tarifa.tipo}</p>
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Monto de la tarifa */}
        <div className="mb-4">
          <label htmlFor="monto" className="mb-2 block text-sm font-medium">
            Ingrese un nuevo monto
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="monto"
                name="monto"
                type="number"
                step="0.01"
                placeholder="Ingrese un monto en ARS"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="monto-error"
                defaultValue={tarifa.monto_centavos / 100}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="monto-error" aria-live="polite" aria-atomic="true">
            {state.errors?.monto &&
              state.errors.monto.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Alerta de error en algun campo */ }
        <div id="fields-error" aria-live="polite" aria-atomic="true">
          {state.message ? 
            <p className="mt-2 text-sm text-red-500"> {state.message} </p> 
            : 
            null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tarifas"
          className="flex h-10 items-center rounded-lg bg-gray-500 px-4 text-sm font-medium text-gray-50 transition-colors hover:bg-sky-800"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Tarifa</Button>
      </div>
    </form>
  );
}