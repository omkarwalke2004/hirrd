import { getApplications } from '@/api/apiapplication'; 
import useFetch from '@/hooks/use-fetch'; 
import { useUser } from '@clerk/clerk-react'; 
import React, { useEffect } from 'react' 
import { BarLoader } from 'react-spinners'; 
import ApplicationCard from './application-card'; 

const CreatedApplications = () => {
    const { user, isLoaded } = useUser();

    // Initialize useFetch with no initial data
    const { 
        loading: loadingApplications, 
        data: applications = [], // default applications to an empty array
        fn: fnApplications, 
    } = useFetch(getApplications,{
        user_id:user.id,
    });

    // Only make the API call when the user is loaded
    useEffect(() => {
        fnApplications();
    }, []);

    if (loadingApplications) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
    }

    // Ensure applications is defined and is an array
    return (
        <div className='flex flex-col gap-2 pr-28 pl-28'>
            {applications.length > 0 ? (
                applications.map((application) => {
                    return <ApplicationCard key={application.id} application={application} isCandidte />
                })
            ) : (
                <p>No applications found</p>
            )}
        </div>
    );
}

export default CreatedApplications;
