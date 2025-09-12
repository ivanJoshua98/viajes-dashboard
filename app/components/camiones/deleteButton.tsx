'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'; 
import { deleteCamion } from '@/app/lib/actions/camionActions';

export function DeleteCamion({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteCamionWithId = deleteCamion.bind(null, id); // Server action

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
          <div className="rounded-lg bg-indigo-800 p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-50">¿Estás seguro?</h2>
            <p className="text-sm text-gray-50 mt-2">
              Se eliminará el camión permanentemente.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-gray-500 px-4 py-2 text-sm text-gray-50 hover:bg-sky-800"
              >
                Cancelar
              </button>

              <form action={deleteCamionWithId}>
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
