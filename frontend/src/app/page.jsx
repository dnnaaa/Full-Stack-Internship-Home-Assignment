'use client';

import { Button, Typography, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/jobs');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Container maxWidth="lg">
        <Box 
          sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '8px',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '2rem' }}>
            Welcome to Job Listing App
          </Typography>
          <Typography variant="h6" sx={{ color: '#555', marginBottom: '2rem' }}>
            Explore and manage job listings with ease. Let's get started!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 6,
              }
            }}
            onClick={handleClick}
          >
            Go to Job Listings
          </Button>
        </Box>
      </Container>
    </div>
  );
}
