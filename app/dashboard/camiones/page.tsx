import CamionesTable from "@/app/components/camiones/camionesTable";
import { AddCamion } from "@/app/components/camiones/buttons";
import { CamionesTableSkeleton, TableRowSkeleton } from "@/app/components/dashboard/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import TiposCamionTable from "@/app/components/camiones/tiposCamionTable";
import { AddTipoCamionBtn } from "@/app/components/camiones/addTipoCamionBtn";


export const metadata: Metadata = {
  title: 'Camiones'
};

export default function Camiones () {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Camiones</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddCamion />
      </div>
      {<Suspense fallback={<CamionesTableSkeleton />}>
        <CamionesTable />
      </Suspense>}
      <div className="flex mt-8 w-full items-center justify-between">
        <h1 className={'text-2xl'}>Tipos de camión</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddTipoCamionBtn />
      </div>
      {<Suspense>
        <TiposCamionTable />
      </Suspense>}      
    </div>
  );
}