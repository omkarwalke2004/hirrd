import { getSavedJobs } from '@/api/apiJobs'
import JobCard from '@/components/ui/JobCard'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

const SaveJobs = () => {
  const{isLoaded}=useUser();
  
  const{
    loding:loadingSavedjobs,
    data:savedJobs,
    fn:fnSavedJobs,

  }=useFetch(getSavedJobs);
  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);
  if (!isLoaded || loadingSavedjobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Saved Jobs</h1>
      

      {!loadingSavedjobs && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pl-20 pr-20 rounded-lg'>
          {Array.isArray(savedJobs) && savedJobs.length ? (
            savedJobs.map((saved) => (
              <JobCard key={saved.id} job={saved?.job} savedInit={true} 
              onJobSaved={fnSavedJobs}
              />
            ))
          ) : (
            <div className='text-center text-gray-300'>
              <span>No Saved Jobs Found 😒</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SaveJobs
