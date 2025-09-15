import { fetchTiposCamion } from "@/app/lib/data/fetchDataCamiones";

export default async function TiposCamionTable () {

  const tipos = await fetchTiposCamion();

  return (
    <div className="mt-6 flex flex-col space-y-2">
      {
        tipos.map(tipo => (
          <div
            key={tipo.id}
            className="flex h-[48px] items-center gap-2 rounded-md bg-sky-800 px-3 text-sm font-medium"
          >
            <p>{tipo.tipo}</p>
          </div>
        ))
      }
    </div>
  );
}