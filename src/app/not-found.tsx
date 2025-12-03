import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Page Not Found | Sydney Removalist",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Go Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
