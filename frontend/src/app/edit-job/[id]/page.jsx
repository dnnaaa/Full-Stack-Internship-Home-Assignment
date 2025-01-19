import JobForm from '@components/JobForm';

export default function HomePage({ params }) {
  const { id } = params;
  return (
    <div className="flex pt-40 justify-center h-screen bg-gray-50">
      {/*<h1 className='text-4xl font-bold'>Welcome to My Next.js App!</h1>*/}
      <div className="w-1/2">
        <JobForm jobId={id} />
      </div>
    </div>
  );
}
