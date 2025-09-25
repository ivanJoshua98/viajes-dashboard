'use client';

import { useActionState } from "react";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { CurrencyDollarIcon, FlagIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { createTarifa, StateTarifaForm } from "@/app/lib/actions/tarifaAction";
import { TipoCamion, Zona } from "@/app/lib/data/definitions";

export default function CreateTarifaForm ({ zonas, tipos }: { zonas: Zona[], tipos: TipoCamion[] }) {

  const initialState: StateTarifaForm = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTarifa, initialState);

  return (
    <form action={ formAction }>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">

        {/* Zona */}
        <div className="mb-4">
          <label htmlFor="zona" className="mb-2 block text-sm font-medium">
            Elija una zona
          </label>
          <div className="relative">
            <select
              id="zona"
              name="zona"
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
              defaultValue=""
              aria-describedby="zona-error"
            >
              <option value="" disabled className="bg-gray-800">
                Seleccione una zona
              </option>
              {zonas.map((zona) => (
                <option key={zona.id} value={zona.id} className="bg-gray-800">
                  {zona.nombre}
                </option>
              ))}
            </select>
            <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
          <div id="zona-error" aria-live="polite" aria-atomic="true">
            {state.errors?.zona &&
              state.errors.zona.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tipo de camion */}
        <div className="mb-4">
          <label htmlFor="tipo" className="mb-2 block text-sm font-medium">
            Elija una tipo
          </label>
          <div className="relative">
            <select
              id="tipo"
              name="tipo"
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
              defaultValue=""
              aria-describedby="tipo-error"
            >
              <option value="" disabled className="bg-gray-800">
                Seleccione un tipo
              </option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id} className="bg-gray-800">
                  {tipo.tipo}
                </option>
              ))}
            </select>
            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
          <div id="tipo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipo &&
              state.errors.tipo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Monto de la tarifa */}
        <div className="mb-4">
          <label htmlFor="monto" className="mb-2 block text-sm font-medium">
            Elija un monto
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
        <Button type="submit">Agregar Tarifa</Button>
      </div>
    </form>
  );
}