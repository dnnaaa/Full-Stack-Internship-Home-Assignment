import { Inter } from 'next/font/google';
import ProcessUploadButton from '@/pages/ProcessUploadButton';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Set the container height to full viewport height
  };

  return (
      <div style={containerStyle}>
        <ProcessUploadButton />
      </div>
  );
}
