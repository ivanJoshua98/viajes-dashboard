import { CamionesTableSkeleton } from "@/app/components/dashboard/skeletons";
import { AddZona } from "@/app/components/zonas/buttons";
import ZonasTable from "@/app/components/zonas/zonasTable";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata : Metadata = {
  title: 'Zonas'
};

export default function Zonas () {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Zonas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddZona />
      </div>
      {<Suspense fallback={<CamionesTableSkeleton />}>
        <ZonasTable />
      </Suspense>}
    </div>
  );
}