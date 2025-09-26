'use client';

import { IdentificationIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { useActionState } from 'react';
import { createCamion, StateCamionForm } from '@/app/lib/actions/camionActions';

export default function CreateCamionForm () {

  const initialState: StateCamionForm = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCamion, initialState);

  function resetAlert () {
    state.message = '';
  }

  return (
    <form action={ formAction } onChange={ resetAlert }>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">

        {/* Patente del camion */}
        <div className="mb-4">
          <label htmlFor="patente" className="mb-2 block text-sm font-medium">
            Ingrese la patente
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="patente"
                name="patente"
                type="text"
                defaultValue=""
                placeholder="Ingrese una patente valida"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="patente-error"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
            </div>
          </div>
          <div id="patente-error" aria-live="polite" aria-atomic="true">
            {state.errors?.patente &&
              state.errors.patente.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Alertas */}
        <div id="fields-error" aria-live="polite" aria-atomic="true">
          {state.message ? 
            <p className="mt-2 text-sm text-red-500"> {state.message} </p> 
            : 
            null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/camiones"
          className="flex h-10 items-center rounded-lg bg-gray-500 px-4 text-sm font-medium text-gray-50 transition-colors hover:bg-sky-800"
        >
          Cancelar
        </Link>
        <Button type="submit">Agregar Camión</Button>
      </div>
    </form>
  );
}
