'use client';

import { createTipoCamion, StateTipoCamionForm } from "@/app/lib/actions/tipoCamionAction";
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline";
import { useActionState, useState } from "react";

export function AddTipoCamionBtn () {

  const [isOpen, setIsOpen] = useState(false);
  const initialState: StateTipoCamionForm = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTipoCamion, initialState); // Server action

  function resetAlerts () {
    const tipoError = document.getElementById('tipo-error');
    if ( tipoError ) { tipoError.innerHTML = '' };

    const fieldsError = document.getElementById('fields-error');
    if ( fieldsError ) { fieldsError.innerHTML = '' };
  }

  return (
    <>
    {/* Boton de crear */}
    <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Agregar tipo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </button>
    {/* Modal de creacion */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <form action={formAction} onChange={resetAlerts}>
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg w-full max-w-sm border border-black">
              <h2 className="text-lg font-semibold text-gray-50">Nuevo tipo de camión</h2>
              <div className="mb-4">
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="tipo"
                      name="tipo"
                      type="text"
                      defaultValue=""
                      placeholder="Ingrese una tipo válido"
                      className="peer block w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="tipo-error"
                    />
                    <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
                  </div>
                </div>
                <div id="tipo-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.tipo &&
                    state.errors.tipo.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
                <div id="fields-error" aria-live="polite" aria-atomic="true">
                  {state.message ? 
                    <p className="mt-2 text-sm text-red-500"> {state.message} </p> 
                    : 
                    null}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-gray-500 px-4 py-2 text-sm text-gray-50 hover:bg-sky-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-green-900 px-4 py-2 text-sm text-white hover:bg-green-800"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}