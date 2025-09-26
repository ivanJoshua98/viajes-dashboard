import Breadcrumbs from "@/app/components/dashboard/breadcrums";
import EditViajeForm from "@/app/components/viajes/editViajeForm";
import { fetchCamiones, fetchTiposCamion } from "@/app/lib/data/fetchDataCamiones";
import { fetchTarifas, fetchTarifasAdicionales } from "@/app/lib/data/fetchDataTarifas";
import { fetchViajeById } from "@/app/lib/data/fetchDataViajes";
import { fetchZonas } from "@/app/lib/data/fetchDataZonas";
import { notFound } from "next/navigation";

export default async function Page (props: { params: Promise<{ id: string}> }) {
  
  const params = await props.params;
  const id = params.id;
  const [ viaje, camiones, zonas, tarifas, tipos, tarifasAdicionales ]  = await Promise.all([
    fetchViajeById(id),
    fetchCamiones(),
    fetchZonas(),
    fetchTarifas(),
    fetchTiposCamion(),
    fetchTarifasAdicionales()
  ]);

  if (!viaje) {
    notFound();
  }

  return (
    <main>
      crumbs
        breadcrumbs={[
          { label: 'Viajes', href: '/dashboard/viajes' },
          {
            label: 'Editar viaje',
            href: `/dashboard/viajes/${id}/editar`,
            active: true,
          },
        ]}
      />
      <EditViajeForm viaje={viaje} camiones={camiones} zonas={zonas} tarifas={tarifas} tipos={tipos} tarifasAdicionales={tarifasAdicionales}/>
    </main>
  )
}