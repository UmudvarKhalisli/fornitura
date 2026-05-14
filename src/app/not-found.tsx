import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="text-8xl md:text-9xl font-bold text-light-gray mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-deep-charcoal mb-2">Page not found</h1>
        <p className="text-medium-gray mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-deep-charcoal text-white font-medium rounded-md hover:bg-dark-graphite transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
