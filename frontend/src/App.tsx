import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className='mx-auto w-full border-border/40 dark:border-border min-[1600px]:max-w-[1536px] min-[1600px]:border-x'>
      <Navbar />
      <div className="max-w-6xl mx-auto my-3 max-[1200px]:mx-4">
        <Outlet />
      </div>
    </div>
  )
}