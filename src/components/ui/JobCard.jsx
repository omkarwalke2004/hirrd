import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import {  deleteJob, saveJob } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';

const JobCard = ({
    job,
    isMyJob=false,
    savedInit =false,
    onJobSaved=()=> {},

}) => {
 const[saved,setsaved] =useState(savedInit);
  const{fn:fnSavedJob,data:SavedJob,loading:loadingSavedJob

  }=useFetch(saveJob,{
    alreadysaved:saved,
  });
 
    const{user}=useUser();
    const handelSavedjob=async()=>{
      await fnSavedJob({
        user_id:user.id,
        job_id:job.id,
      });
      onJobSaved();

    }
    const{loading:loadingdeletedJob,fn: fndeleteJob} = useFetch(deleteJob,{
      job_id:job.id,

    })
    const handelete=async()=>{
      await fndeleteJob()
      onJobSaved();

    }
    useEffect(()=>{
         if(SavedJob!==undefined) setsaved(SavedJob?.length>0);
    },[SavedJob])
    
  return (
    <Card className="shadow-lg flex flex-col rounded-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {loadingdeletedJob &&(
        <BarLoader className='mt-4' width={"100%"} color='#36d7b7'/>
      )}
  <CardHeader>
    <CardTitle className="flex justify-between items-center font-semibold text-lg">
      {job.title}
      {isMyJob && (
        <Trash2Icon fill='red' size={20} onClick={handelete} className='text-red-300 cursor-pointer hover:text-red-500 transition-colors' />
      )}
    </CardTitle>
  </CardHeader>

  <CardContent className="flex flex-col gap-4 flex-1">
    <div className="flex justify-between items-center">
      {job.company && <img src={job.company.logo_url} className='h-10 object-contain' alt={`${job.company.name} logo`} />}
      <div className="flex gap-2 items-center text-gray-400 text-sm">
        <MapPinIcon size={18} />
        <span>{job.location}</span>
      </div>
    </div>

    <hr className="border-t border-gray-600" />

    <div className="text-sm text-gray-300 leading-relaxed">
      {job.description.substring(0, job.description.indexOf("."))}.
    </div>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Link to={`/job/${job.id}`} className='flex-1'>
    <Button variant='secondary' className="w-full">
      More Details

    </Button>
    </Link>
    {!isMyJob && (
      <Button variant="outline" className="w-15" onClick={handelSavedjob}disabled={loadingSavedJob}>
       {saved?(
       <Heart size={20} stroke='red' fill='red'/>
       ):(
        <Heart size={20}/>
       )
      } 
      </Button>
    )}
    
   

  </CardFooter>
</Card>

   

    
  )
}

export default JobCard
