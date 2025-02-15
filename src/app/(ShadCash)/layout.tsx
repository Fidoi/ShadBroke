import { Footer } from '@/components';
import NavBar from '@/components/navbar/NavBar';

export default function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
