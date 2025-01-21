import Link from "next/link";

export default function HomePage() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <Link href="/jobs" legacyBehavior>
        <a className="text-2xl font-semibold text-blue-600 underline">Go to Job List</a>
      </Link>
    </div>
  );
}
