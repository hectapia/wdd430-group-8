import Link from 'next/link';
import HandcraftLogo from '@/app/ui/handcraft-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';
import MenuLinks from './menu-links';

export default function TopNav() {
  return (
    <div className="flex w-full flex-col md:flex-row px-0 py-4 md:space-x-2">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-amber-700 p-4 md:h-20"
        href="/"
      >
        <div className="w-90 text-white md:w-90">
          <HandcraftLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-row md:space-x-2 md:space-y-0">
        <MenuLinks />
        <div className="hidden h-[80px] w-auto grow rounded-md bg-gray-50 md:block"></div>
        {/* <form action={async () => {
            'use server';
            await signOut();
          }}> */}
        <form>
          <button className="flex h-[80px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-700 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign In</div>
          </button>
        </form>
      </div>
    </div>
  );
}
