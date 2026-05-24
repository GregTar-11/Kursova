import Header from '@/components/features/Header/Header';
import Footer from '@/components/features/Footer/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 bg-c-bg">{children}</main>
      <Footer />
    </div>
  );
}
