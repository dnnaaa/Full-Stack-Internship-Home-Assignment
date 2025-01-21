export default function ProductsLayout({ children }) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Jobs</h1>
        </header>
        <main>{children}</main>
      </div>
    );
  }  