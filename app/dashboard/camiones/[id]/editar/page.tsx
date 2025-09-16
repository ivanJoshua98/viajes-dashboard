import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCamionById } from '@/app/lib/data/fetchDataCamiones';
import Breadcrumbs from '@/app/components/dashboard/breadcrums';
import EditCamionForm from '@/app/components/camiones/edit-form';

export const metadata: Metadata = {
  title: 'Editar'
};
 
export default async function Page (props: { params: Promise<{ id: string }> }) {

  const params = await props.params;
  const id = params.id;
  const [ camion ] = await fetchCamionById(id);

  if(!camion){
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Camiones', href: '/dashboard/camiones' },
          {
            label: 'Editar camión',
            href: `/dashboard/camiones/${id}/editar`,
            active: true,
          },
        ]}
      />
      <EditCamionForm camion={camion} />
    </main>
  );
}