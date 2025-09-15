import Breadcrumbs from "@/app/components/dashboard/breadcrums";
import EditZonaForm from "@/app/components/zonas/editZonaForm";
import { fetchZonaById } from "@/app/lib/data/fetchDataZonas";
import { Metadata } from "next"
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Editar'
};

export default async function Page (props: { params: Promise<{ id: string }> }) {

  const params = await props.params;
  const id = params.id;
  const [ zona ] = await fetchZonaById(id);

  if (!zona) {
    notFound();
  }

  return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Zonas', href: '/dashboard/zonas' },
            {
              label: 'Editar zona',
              href: `/dashboard/zona/${id}/editar`,
              active: true,
            },
          ]}
        />
        <EditZonaForm zona={zona} />
      </main>
    );
}