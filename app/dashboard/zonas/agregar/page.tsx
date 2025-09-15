import Breadcrumbs from "@/app/components/dashboard/breadcrums";
import CreateZonaForm from "@/app/components/zonas/createZonaForm";
import { Metadata } from "next"


export const metadata : Metadata = {
  title: 'Agregar'
};

export default function Page () {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Zonas', href: '/dashboard/zonas' },
          {
            label: 'Agregar zona',
            href: '/dashboard/zonas/agregar',
            active: true,
          },
        ]}
      />
      <CreateZonaForm />
    </main>
  );
}