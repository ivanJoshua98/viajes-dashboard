import { CamionesTableSkeleton } from "@/app/components/dashboard/skeletons";
import { AddViaje } from "@/app/components/viajes/buttons";
import ViajesTable from "@/app/components/viajes/viajesTable";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Viajes'
};

export default function Viajes () {
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Viajes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddViaje />
      </div>
      {<Suspense fallback={<CamionesTableSkeleton />}>
        <ViajesTable />
      </Suspense>}
    </div>
  )
}