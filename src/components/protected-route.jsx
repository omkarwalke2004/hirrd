import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Protectedroute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  // Wait until the user data is fully loaded before making any decisions
  if (!isLoaded) {
    return <div>Loading...</div>; // You can replace this with a spinner or some loading UI
  }

  // If the user is not signed in, redirect to the sign-in page
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  // If the user is signed in but has no role, redirect them to the onboarding page
  if (!user?.unsafeMetadata?.role && pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  // If all conditions are met, render the children (protected content)
  return children;
};

export default Protectedroute;
