import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-48 mt-16 p-6">
        {children}
      </main>
    </div>
  );
}
