import { getMyJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from './ui/JobCard';
                           
const CreatedJobs = () => {
   const{user}= useUser();
   const{
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn:fnCreatedJobs,

   }=useFetch(getMyJobs,{
    recruiter_id:user.id,
   })
   useEffect(()=>{
       fnCreatedJobs();
   },[])
   if (loadingCreatedJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
}
  return (
    <div>
         <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pl-20 pr-20 rounded-lg'>
          {Array.isArray(createdJobs) && createdJobs.length ? (
            createdJobs.map((job) => (
              <JobCard key={job.id} job={job} onJobSaved={fnCreatedJobs}
              isMyJob
              />
            ))
          ) : (
            <div className='text-center text-gray-300'>
              <span>No Jobs Found 👎</span>
            </div>
          )}
        </div>
      
    </div>
  )
}

export default CreatedJobs


