import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Protectedroute = ({ children }) => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { pathname } = useLocation();

    // Wait for the user data to load before making any checks
    if (!isLoaded) {
        return null; // Optionally return a loader here
    }

    // Redirect if the user is not signed in
    if (!isSignedIn) {
        return <Navigate to="/?sign-in=true" />;
    }

    // Redirect to onboarding if the user has no role and is not already on the onboarding page
    if (user && !user?.unsafeMetadata?.role && pathname !== '/onboarding') {
        return <Navigate to="/onboarding" />;
    }

    return children; // Render the protected child components if all checks pass
};

export default Protectedroute;
