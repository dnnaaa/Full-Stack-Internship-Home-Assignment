import { DeleteJob, UpdateJob } from './button';

const Table = ({jobData}) => {

  return (
    <>
      <div className='mt-6 flow-root'>
        <div className='inline-block w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='md:hidden'>
              {jobData?.map((data) => (
                <div
                  key={data.id}
                  className='mb-2 w-full rounded-md bg-white p-4'>
                  <div className='flex items-center justify-between border-b pb-4'>
                    <div>
                      <div className='mb-2 flex items-center'>

                        <p>{data.title}</p>
                      </div>
                      <p className='text-sm text-gray-500'>{data.location}</p>
                    </div>
                  </div>
                  <div className='flex w-full items-center justify-between pt-4'>
                    <div>
                      <p className='text-xl font-medium'>
                        {data.salary} DH
                      </p>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <UpdateJob id={data.id} />
                      <DeleteJob id={data.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    ID
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Location
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Salary
                  </th>
                  <th scope='col' className='relative text-center py-3 pl-6 pr-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {jobData?.map((data) => (
                  <tr
                    key={data.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <p>{data.id}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.title}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.location}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.salary} DH
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-center gap-3'>
                        <UpdateJob id={data.id} />
                        <DeleteJob id={data.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
