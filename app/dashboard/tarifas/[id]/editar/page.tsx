import Breadcrumbs from "@/app/components/dashboard/breadcrums";
import EditTarifaForm from "@/app/components/tarifas/editTarifaForm";
import { fetchTarifaById } from "@/app/lib/data/fetchDataTarifas";
import { notFound } from "next/navigation";


export default async function Page (props: { params: Promise<{ id: string}> }) {
  
  const params = await props.params;
  const id = params.id;
  const tarifa  = await fetchTarifaById(id);

  if (!tarifa) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tarifas', href: '/dashboard/tarifas' },
          {
            label: 'Editar tarifa',
            href: `/dashboard/tarifa/${id}/editar`,
            active: true,
          },
        ]}
      />
      <EditTarifaForm tarifa={tarifa} />
    </main>
  )
}