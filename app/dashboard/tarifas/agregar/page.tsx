import Breadcrumbs from '@/app/components/dashboard/breadcrums';
import CreateTarifaForm from '@/app/components/tarifas/createTarifaForm';
import { fetchTiposCamion } from '@/app/lib/data/fetchDataCamiones';
import { fetchZonas } from '@/app/lib/data/fetchDataZonas';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Agregar'
};
 
export default async function Page () {

  const [zonas, tipos] = await Promise.all([
    fetchZonas(),
    fetchTiposCamion(),
  ]);
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tarifas', href: '/dashboard/tarifas' },
          {
            label: 'Agregar tarifa',
            href: '/dashboard/tarifas/agregar',
            active: true,
          },
        ]}
      />
      <CreateTarifaForm zonas={zonas} tipos={tipos}/>
    </main>
  );
}