import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      return (await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}`)).data;
    },
  });
};
