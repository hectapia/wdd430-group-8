import Form from '@/app/ui/artisans/create-form';
import Breadcrumbs from '@/app/ui/artisans/breadcrumbs';
import { fetchArtisans } from '@/app/lib/data';
 
export default async function Page() {
  const artisans = await fetchArtisans();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Artisans', href: '/artisans' },
          {
            label: 'Add Artisan',
            href: '/artisans/add',
            active: true,
          },
        ]}
      />
      <Form artisans={artisans} />
    </main>
  );
}