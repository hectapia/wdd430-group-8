import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import TopNav from './ui/topnav';
import HandcraftLogo from './ui/handcraft-logo';
import LatestProduct from '@/app/ui/latest-products';
import { fetchLatestProducts } from '@/app/lib/data';


export default async function Page() {
  const latestProducts = await fetchLatestProducts();
  return (
    <main className="flex min-h-screen flex-col pb-6 ">
      <div className="flex h-80 shrink-0 items-end rounded-lg bg-[url('/hero-mobile.jpg')] bg-cover p-4 md:bg-[url('/hero-desktop.jpg')]"></div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-red-50 px-6 py-10 md:w-3/5 md:px-20">
          <p
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className} antialiased`}
          >
            Handcrafted Haven is an innovative web application that aims to
            provide a platform for artisans and crafters to showcase and sell
            their unique handcrafted items. The project overview can be found{' '}
            <a
              href="https://byui-cse.github.io/wdd430-ww-course/pages/group-project-description.html"
              className="text-blue-500"
            >
              here
            </a>
            .
          </p>
        </div> {/*
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div> */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-4">
          <LatestProduct latestProducts={latestProducts} />
        </div>
      </div>
    </main>
  );
}
