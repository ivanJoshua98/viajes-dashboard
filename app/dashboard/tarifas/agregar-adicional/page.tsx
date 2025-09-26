import Breadcrumbs from '@/app/components/dashboard/breadcrums';
import CreateTarifaAdicionalForm from '@/app/components/tarifas/createTarifaAdicionalForm';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Agregar'
};
 
export default async function Page () {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tarifas', href: '/dashboard/tarifas' },
          {
            label: 'Agregar tarifa adicional',
            href: '/dashboard/tarifas/agregar-adicional',
            active: true,
          },
        ]}
      />
      <CreateTarifaAdicionalForm />
    </main>
  );
}