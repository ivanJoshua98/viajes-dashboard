import { CamionesTableSkeleton } from "@/app/components/dashboard/skeletons";
import { AddTarifa, AddTarifaAdicional } from "@/app/components/tarifas/buttons";
import TarifasAdicionalesTable from "@/app/components/tarifas/tarifasAdicionalesTable";
import TarifasTable from "@/app/components/tarifas/tarifasTable";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Tarifas'
};

export default function Tarifas () {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Tarifas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddTarifa />
      </div>
      {<Suspense fallback={<CamionesTableSkeleton />}>
        <TarifasTable />
      </Suspense>}
      <div className="mt-8 flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Tarifas Adicionales</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddTarifaAdicional />
      </div>
      {<Suspense fallback={<CamionesTableSkeleton />}>
        <TarifasAdicionalesTable />
      </Suspense>}
    </div>
  );
}