import { CamionesTableSkeleton } from "@/app/components/dashboard/skeletons";
import Pagination from "@/app/components/pagination";
import Search from "@/app/components/search";
import { AddViaje, GenerateReport } from "@/app/components/viajes/buttons";
import ViajesTable from "@/app/components/viajes/viajesTable";
import { fetchViajesPages } from "@/app/lib/data/fetchDataViajes";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Viajes'
};

export default async function Viajes ( props: {
  searchParams?: Promise<{
    query?: string,
    page?: string,
  }>
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchViajesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Viajes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar viajes..." />
        <AddViaje />
        <GenerateReport />
      </div>
      {<Suspense key={query + currentPage} fallback={<CamionesTableSkeleton />}>
        <ViajesTable query={query} currentPage={currentPage} />
      </Suspense>}
      <div className="mt-5 flex w-full justify-center">
        { <Pagination totalPages={totalPages} /> }
      </div>
    </div>
  )
}