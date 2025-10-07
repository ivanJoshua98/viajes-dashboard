import { CamionesTableSkeleton } from "@/app/components/dashboard/skeletons";
import DatesInput from "@/app/components/viajes/datesInput";
import ViajesReportTable from "@/app/components/viajes/viajesReportTable";
import { formatDate } from "@/app/lib/utils/formatDateToLocal";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: 'Generar reporte'
};


export default async function Page (props: {
  searchParams?: Promise<{
    startDate?: string,
    endDate?: string,
  }>
}) {

  const searchParams = await props.searchParams;
  const startDate = searchParams?.startDate || formatDate(new Date());
  const endDate = searchParams?.endDate || formatDate(new Date());

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Generar un reporte</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <DatesInput />
      </div>
      {<Suspense key={startDate + endDate} fallback={<CamionesTableSkeleton />}>
        <ViajesReportTable startDate={startDate} endDate={endDate} />
      </Suspense>}
    </div>
  )
}