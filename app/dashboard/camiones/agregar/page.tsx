import CreateCamionForm from '@/app/components/camiones/create-form';
import Breadcrumbs from '@/app/components/dashboard/breadcrums';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Agregar'
};
 
export default function Page () {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Camiones', href: '/dashboard/camiones' },
          {
            label: 'Agregar camión',
            href: '/dashboard/camiones/agregar',
            active: true,
          },
        ]}
      />
      <CreateCamionForm />
    </main>
  );
}