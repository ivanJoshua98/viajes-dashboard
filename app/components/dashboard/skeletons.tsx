
export function TableRowSkeleton() {
  return (
    <tr className="w-full bg-gray-800 border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Camion */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-500"></div>
        </div>
      </td>
      {/* Patente */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-500"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
        </div>
      </td>
    </tr>
  );
}

export function CamionesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-800 p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="h-6 w-16 rounded bg-gray-500"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-500"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-500"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-500"></div>
          <div className="h-10 w-10 rounded bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
}

export function CamionesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-sky-800 p-2 md:pt-0">
          <div className="md:hidden">
            <CamionesMobileSkeleton />
            <CamionesMobileSkeleton />
            <CamionesMobileSkeleton />
            <CamionesMobileSkeleton />
            <CamionesMobileSkeleton />
            <CamionesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-50 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Camion
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Patente
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-800 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-500" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-500 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-gray-600 px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-500" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}


export function ViajeSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-500" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-500" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-500" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-500" />
    </div>
  );
}

export function LatestViajesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-500" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-800 p-4">
        <div className="bg-gray-600 px-6">
          <ViajeSkeleton />
          <ViajeSkeleton />
          <ViajeSkeleton />
          <ViajeSkeleton />
          <ViajeSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-500" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-500" />
        </div>
      </div>
    </div>
  );
}

export function TiposDeCamionesTableSkeleton () {
  return (
    <div className="mt-6 flex flex-col space-y-2">
      <div className="flex h-[48px] items-center gap-2 rounded-md bg-sky-800 px-3">
        <div className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-500"></div>
        </div>
      </div>

      <div className="flex h-[48px] items-center gap-2 rounded-md bg-sky-800 px-3">
        <div className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-500"></div>
        </div>
      </div>

      <div className="flex h-[48px] items-center gap-2 rounded-md bg-sky-800 px-3">
        <div className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-500"></div>
        </div>
      </div>

    </div>
  )
}