import { CardsData } from '@/app/lib/data/definitions';
import { fetchCardData } from '@/app/lib/data/fetchDataCards';
import { formatMoney } from '@/app/lib/utils/formatMoney';
import {
  BanknotesIcon,
  TruckIcon,
  MapIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';


function getFormatedActualMonth () {
  const actualMonth = new Date().getMonth();
  return [
    'Enero', 
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
   ][actualMonth];
}

const iconMap = {
  viajes: MapIcon,
  paid: CurrencyDollarIcon,
};

export default async function CardWrapper() {
  const cardsData = await fetchCardData();

  return (
    <>
      <CamionCard title="Camión más utilizado" content={cardsData} />
      <Card title="Cant. de viajes hechos" content={cardsData.cant_viajes_mes} type="viajes" />
      <Card title="Ingresos por viajes" content={`$${formatMoney(cardsData.ingresos_viajes_mes)}`} type="paid" />
      <ZonaCard title="Zona más recurrente" content={cardsData}/>
    </>
  );
}

export function Card({
  title,
  content,
  type,
}: {
  title: string;
  content: string | number;
  type: 'viajes' | 'paid'; 
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-800 p-2 shadow-sm">
      <p className={'text-[10px] text-gray-400 pt-2 text-end'}>
        Datos de {getFormatedActualMonth()} 
      </p>
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-50" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={'truncate rounded-xl bg-gray-600 px-4 py-8 text-center text-2xl'}
      >
        {content}
      </p>
    </div>
  );
}

export function CamionCard({ title, content }: { title: string; content: CardsData ; }) {
  return (
    <div className="rounded-xl bg-gray-800 p-2 shadow-sm">
      <p className={'text-[10px] text-gray-400 pt-2 text-end'}>
        Datos de {getFormatedActualMonth()} 
      </p>
      <div className="flex p-4">
        <TruckIcon className="h-5 w-5 text-gray-50" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className={'truncate rounded-xl bg-gray-600 px-4 py-4'}>
        <p className={'text-center text-2xl'}>
          {content.patente_camion_mas_usado}
        </p>
        <p className={'text-center pt-2'} >
          Viajes: {content.usos_camion_mes}
        </p>
      </div>
    </div>
  );
}


export function ZonaCard({ title, content }: { title: string; content: CardsData ; }) {
  return (
    <div className="rounded-xl bg-gray-800 p-2 shadow-sm">
      <p className={'text-[10px] text-gray-400 pt-2 text-end'}>
        Datos de {getFormatedActualMonth()} 
      </p>
      <div className="flex p-4">
        <MapPinIcon className="h-5 w-5 text-gray-50" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className={'truncate rounded-xl bg-gray-600 px-4 py-4'}>
        <p className={'text-center text-2xl'}>
          {content.nombre_zona_mas_visitada}
        </p>
        <p className={'text-center pt-2'} >
          Viajes: {content.viajes_zona_mes}
        </p>
      </div>
    </div>
  );
}