import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import TopNav from './ui/topnav';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased px-6`}><div ><TopNav /></div>{children}</body>
    </html>
  );
}

