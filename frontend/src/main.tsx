import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StyledEngineProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './routes/Jobs.tsx'
import Job from './routes/Job.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        index: true,
        element: <Jobs />
      },
      {
        path: "job",
        element: <Job />
      },
      {
        path: "job/:id",
        element: <Job />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </StrictMode>,
)
