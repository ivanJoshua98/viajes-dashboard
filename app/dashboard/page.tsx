import { Suspense } from 'react';
import { CardsSkeleton, LatestViajesSkeleton } from '@/app/components/dashboard/skeletons';
import CardWrapper from '@/app/components/dashboard/cards';
import LatestViajes from '@/app/components/dashboard/lastestViajes';
 
export default async function Dashboard() {

  return (
    <main>
      <h1 className={'mb-4 text-xl md:text-2xl'}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={ <CardsSkeleton /> }>
          <CardWrapper /> 
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={ <LatestViajesSkeleton /> }>
          <LatestViajes />
        </Suspense>
      </div>
    </main>
  );
}