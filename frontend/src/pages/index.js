import Link from 'next/link';

export default function Home() {
  
  return (
    <div className="centered-container">
      <h2>Welcome to our CSV parser app</h2>
      <Link href="/upload">
        <button>Upload</button>
      </Link>
    </div>
  );
  
}