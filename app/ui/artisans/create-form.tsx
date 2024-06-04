import { ArtisanField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  InboxIcon,
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { addArtisan } from '@/app/lib/actions';

export default function Form({ artisans }: { artisans: ArtisanField[] }) {
  return (
    <form action={addArtisan}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Artisan name */}
        <div className="mb-4">
          <label htmlFor="fname" className="mb-2 block text-sm font-medium">
            Artisan name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fname"
                name="fname"
                type="text"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Artisan last name */}
        <div className="mb-4">
          <label htmlFor="lname" className="mb-2 block text-sm font-medium">
            Artisan last name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lname"
                name="lname"
                type="text"
                placeholder="Enter last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Artisan email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Artisan email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Artisan story */}
        <div className="mb-4">
          <label htmlFor="story" className="mb-2 block text-sm font-medium">
            Artisan story
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="story"
                name="story"
                type="text"
                placeholder="Enter story"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Artisan photo */}
        <div className="mb-4">
          <label htmlFor="image_url_artisan" className="mb-2 block text-sm font-medium">
            Artisan photo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url_artisan"
                name="image_url_artisan"
                type="text"
                placeholder="Upload photo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>        

        {/* Artisan password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Artisan password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/artisans"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Artisan</Button>
      </div>
    </form>
  );
}
