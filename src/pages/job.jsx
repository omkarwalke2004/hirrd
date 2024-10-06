import { getsingleJob, UpdateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosedIcon, DoorOpenIcon, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from '@/components/apply-job';
import ApplicationCard from '@/components/application-card';
const Jobpage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  
  // Fetch single job data
  const { fn: fnJob, data: job = {}, loading: loadingJob } = useFetch(getsingleJob, {
    job_id: id,
  });

  const {  loading: loadingHiringStatus ,fn:fnHiringStatus } = useFetch(UpdateHiringStatus, {
    job_id: id,
  });
  const handelstatuschange=(value)=>{
    const isOpen = value ==="open"
    fnHiringStatus(isOpen).then(()=> fnJob());

  }
  

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  // Show loader while data is being fetched
  if (!isLoaded || loadingJob) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  return (
    <div className='flex flex-col gap-8 mt-5 pl-10 pr-10'>
      {/* Job Title and Company Logo */}
      <div className='flex flex-col-reverse md:flex-row gap-6 justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title} />
      </div>

      {/* Job Info Section */}
      <div className='flex justify-between '>
        <div className='flex gap-2 items-center'>
          <MapPinIcon />
          <span>{job?.location}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Briefcase />
          <span>{job?.applications?.length} Applicants</span>
        </div>
        <div className={`flex items-center gap-2 ${job?.isOpen ? 'text-green-600' : 'text-red-600'}`}>
          {job?.isOpen ? <DoorOpenIcon /> : <DoorClosedIcon />}
          <span>{job?.isOpen ? 'Open' : 'Closed'}</span>
        </div>
      </div>
      {job?.recruiter_id === user?.id && <Select  onValueChange={handelstatuschange}>
            <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950":"bg-red-950"}`}>
              <SelectValue placeholder={
                "Hiring Status"+(job?.isOpen ? "(open)":"(closed)")
              } />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>

            
              
            </SelectContent>
          </Select>
}

      {/* About the Job */}
      <h2 className='text-2xl sm:text-3xl font-bold'>About the Job</h2>
      <p className='sm:text-lg'>{job?.description}</p>

      {/* What we are looking for */}
      <h2 className='text-2xl sm:text-3xl font-bold'>What we are looking for❔</h2>

      {/* Markdown Editor Rendering */}
      {loadingHiringStatus && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}
      {job?.requirements && (
        <MDEditor.Markdown
          source={job.requirements}
          className='bg-transparent sm:text-lg'
        />
        
      )}
      {job?.recruiter_id !== user?.id && <ApplyJobDrawer
      job={job} user={user} fetchJob={fnJob} applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
      />}
      {job?.applications?.length>0 && job?.recruiter_id === user.id && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Applications</h2>
          {job?.applications.map((application)=>{
            return <ApplicationCard key={application.id} application={application} />
          })}
        </div>
      )}
    </div>
  );
};

export default Jobpage;
