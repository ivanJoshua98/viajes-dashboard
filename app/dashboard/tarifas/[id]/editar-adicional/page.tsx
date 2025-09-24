import Breadcrumbs from "@/app/components/dashboard/breadcrums";
import EditTarifaAdicionalForm from "@/app/components/tarifas/editTarifaAdicionalForm";
import { fetchTarifaAdicionalById } from "@/app/lib/data/fetchDataTarifas";
import { notFound } from "next/navigation";


export default async function Page (props: { params: Promise<{ id: string}> }) {
  
  const params = await props.params;
  const id = params.id;
  const tarifaAdicional  = await fetchTarifaAdicionalById(id);

  if (!tarifaAdicional) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tarifas', href: '/dashboard/tarifas' },
          {
            label: 'Editar tarifa adicional',
            href: `/dashboard/tarifa/${id}/editar-adicional`,
            active: true,
          },
        ]}
      />
      <EditTarifaAdicionalForm tarifaAdicional={tarifaAdicional} />
    </main>
  )
}