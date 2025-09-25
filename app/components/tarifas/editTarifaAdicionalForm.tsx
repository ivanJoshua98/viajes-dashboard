'use client';

import { StateTarifaAdicionalForm, updateTarifaAdicional } from "@/app/lib/actions/tarifaAction";
import { TarifaAdicional } from "@/app/lib/data/definitions";
import { CalculatorIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useActionState } from "react";
import { Button } from "../button";

export default function EditTarifaForm ( { tarifaAdicional: tarifaAdicional }: { tarifaAdicional: TarifaAdicional }) {

  const initialState: StateTarifaAdicionalForm = { message: null, errors: {} };
  const updateTarifaAdicionalWithId = updateTarifaAdicional.bind(null, tarifaAdicional.id);
  const [state, formAction] = useActionState(updateTarifaAdicionalWithId, initialState);

  return (
    <form action={ formAction }>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">

        {/* Cantidad extra de clientes */}
        <div className="mb-4">
          <label htmlFor="extra" className="mb-2 block text-sm font-medium">
            Cantidad extra de clientes
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <p id="extra"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline"
              >{tarifaAdicional.cantidad}</p>
              <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Monto de la tarifa */}
        <div className="mb-4">
          <label htmlFor="monto" className="mb-2 block text-sm font-medium">
            Monto
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
                defaultValue={tarifaAdicional.monto_centavos / 100}
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
        <Button type="submit">Editar Tarifa Adicional</Button>
      </div>
    </form>
  );
}