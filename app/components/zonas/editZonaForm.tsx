'use client';

import { StateZonaForm, updateZona } from "@/app/lib/actions/zonaAction";
import { Zona } from "@/app/lib/data/definitions";
import { FlagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/app/components/button";

export default function EditZonaForm ({ zona }: {zona: Zona}) {

  const initialState: StateZonaForm = { message: null, errors: {} };
  const updateZonaWithId = updateZona.bind(null, zona.id);
  const [state, formAction] = useActionState(updateZonaWithId, initialState);

  return (
    <form action={ formAction }>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">

        {/* Nombre de la zona */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Ingrese el nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                defaultValue={zona.nombre}
                placeholder="Ingrese un nombre valido"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="nombre-error"
              />
              <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
            </div>
          </div>
          <div id="nombre-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nombre &&
              state.errors.nombre.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        
        {/* Nombre de la region */}
        <div className="mb-4">
          <label htmlFor="region" className="mb-2 block text-sm font-medium">
            Ingrese la región
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="region"
                name="region"
                type="text"
                defaultValue={zona.region}
                placeholder="Ingrese una región valida"
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="region-error"
              />
              <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
            </div>
          </div>
          <div id="region-error" aria-live="polite" aria-atomic="true">
            {state.errors?.region &&
              state.errors.region.map((error: string) => (
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
          href="/dashboard/zonas"
          className="flex h-10 items-center rounded-lg bg-gray-500 px-4 text-sm font-medium text-gray-50 transition-colors hover:bg-sky-800"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Zona</Button>
      </div>
    </form>
  );
}