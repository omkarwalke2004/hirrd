import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import Joblisting from './pages/job-listing';
import PostJob from './pages/post-job';
import SaveJobs from './pages/saved-job';
import Myjobs from './pages/my-jobs';
import Jobpage from './pages/job'; // Make sure to import Jobpage
import { ThemeProvider } from './components/ui/theme-provider';
import Protectedroute from './components/protected-route';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element: (
        <Protectedroute><Onboarding /></Protectedroute>
        )
        ,
      },
      {
        path: '/jobs',
        element: (<Protectedroute><Joblisting /></Protectedroute>),
      },
      {
        path: '/job/:id',
        element:(<Protectedroute><Jobpage /></Protectedroute> ), // Ensure Jobpage is correctly referenced
      },
      {
        path: '/post-job',
        element: (<Protectedroute><PostJob/></Protectedroute>),
      },
      {
        path: '/saved-job',
        element:(
          <Protectedroute>
             <SaveJobs />
          </Protectedroute>
        ),
      },
      {
        path: '/my-jobs',
        element:( <Protectedroute>
          <Myjobs />
        </Protectedroute>),
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />

  </ThemeProvider>
  );
}

export default App;
