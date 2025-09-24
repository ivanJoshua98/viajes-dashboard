import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function AddTarifa () {
  return (
    <Link
      href="/dashboard/tarifas/agregar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Agregar tarifa</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>    
  )
}

export function UpdateTarifa ({ id }: {id: string}) {
  return (
    <Link
      href={`/dashboard/tarifas/${id}/editar`}
      className="rounded-md border p-2 hover:bg-indigo-800"
    >
      <PencilIcon className="w-5" />
    </Link>
  );    
}

export function AddTarifaAdicional () {
  return (
    <Link
      href="/dashboard/tarifas/agregar-adicional"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Agregar tarifa adicional</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>    
  )
}

export function UpdateTarifaAdicional ({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tarifas/${id}/editar-adicional`}
      className="rounded-md border p-2 hover:bg-indigo-800"
    >
      <PencilIcon className="w-5" />
    </Link>
  );    
}