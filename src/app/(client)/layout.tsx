import Header from '@/components/features/Header/Header';
import Footer from '@/components/features/Footer/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="bg-c-bg flex-1">{children}</main>
      <Footer />
    </div>
  );
}
