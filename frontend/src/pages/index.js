import Interface1 from './interface1';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();


  return (
    <div>
      <Interface1 />
    </div>
  );
};

export default Home;