'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'; 
import { deleteViaje } from '@/app/lib/actions/viajeAction';

export function DeleteViaje({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteViajeWithId = deleteViaje.bind(null, id); // Server action

  return (
    <>
      {/* Botón de eliminar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 hover:bg-indigo-800"
      >
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>

      {/* Modal de confirmación */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg w-full max-w-sm border border-black">
            <h2 className="text-lg font-semibold text-gray-50">¿Estás seguro?</h2>
            <p className="text-sm text-gray-50 mt-2">
              Se eliminará el viaje permanentemente.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-gray-500 px-4 py-2 text-sm text-gray-50 hover:bg-sky-800"
              >
                Cancelar
              </button>

              <form action={deleteViajeWithId}>
                <button
                  type="submit"
                  className="rounded-md bg-red-900 px-4 py-2 text-sm text-white hover:bg-red-800"
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
