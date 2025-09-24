import Breadcrumbs from "@/app/components/dashboard/breadcrums";
import CreateViajeForm from "@/app/components/viajes/createViajeForm";
import { fetchCamiones, fetchTiposCamion } from "@/app/lib/data/fetchDataCamiones";
import { fetchTarifas, fetchTarifasAdicionales } from "@/app/lib/data/fetchDataTarifas";
import { fetchZonas } from "@/app/lib/data/fetchDataZonas";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Agregar'
};

export default async function Page () {

  const [ zonas, tipos, camiones, tarifas, tarifasAdicionales ] = await Promise.all([
    fetchZonas(),
    fetchTiposCamion(),
    fetchCamiones(),
    fetchTarifas(),
    fetchTarifasAdicionales()
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Viajes', href: '/dashboard/viajes' },
          {
            label: 'Agregar viaje',
            href: '/dashboard/viajes/agregar',
            active: true,
          },
        ]}
      />
      <CreateViajeForm zonas={zonas} tipos={tipos} camiones={camiones} tarifas={tarifas} tarifasAdicionales={tarifasAdicionales}/>
    </main>
  )
}