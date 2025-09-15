'use client';

import { IdentificationIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { useActionState } from 'react';
import { CamionForm } from '@/app/lib/data/definitions';
import { StateCamionForm, updateCamion } from '@/app/lib/actions/camionActions';

export default function EditCamionForm({ camion }: { camion: CamionForm }) {

  const initialState: StateCamionForm = { message: null, errors: {} };
  const updateCamionWithId = updateCamion.bind(null, camion.id);
  const [state, formAction] = useActionState(updateCamionWithId, initialState);

  function resetAlerts () {
    const patenteError = document.getElementById('patente-error');
    if ( patenteError ) { patenteError.innerHTML = '' };

    const fieldsError = document.getElementById('fields-error');
    if ( fieldsError ) { fieldsError.innerHTML = '' };
  }

  return (
    <form action={ formAction } onChange={resetAlerts}>
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
                defaultValue={camion.patente}
                placeholder="Ingrese una patente valida"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
        <Button type="submit">Editar Camión</Button>
      </div>
    </form>
  );
}
