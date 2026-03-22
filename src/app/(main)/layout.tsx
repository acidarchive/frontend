import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col px-4 mt-16">{children}</main>
      <Footer />
    </div>
  );
}
