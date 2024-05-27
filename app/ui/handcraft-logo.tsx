import { PaintBrushIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function HandcraftLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <PaintBrushIcon className="h-12 w-12" />
      <p className="text-[28px] md:text-[44px]">Handcrafted Haven</p>
    </div>
  );
}
