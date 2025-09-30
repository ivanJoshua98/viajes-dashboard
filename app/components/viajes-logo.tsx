import { TruckIcon } from '@heroicons/react/24/outline';

export default function ViajesLogo() {
  return (
    <div
      className={'flex flex-row items-center leading-none text-gray-50'}
    >
      <TruckIcon className="h-[44px] w-[44px]" />
      <p className="text-[44px]">Viajes</p>
    </div>
  );
}