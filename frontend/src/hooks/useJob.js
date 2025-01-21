import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useJob = (jobId) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) return null;
      return (
        await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${jobId}`)
      ).data;
    },
    enabled: !!jobId,
  });
};
