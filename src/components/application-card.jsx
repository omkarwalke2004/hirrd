import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusinessIcon, Download, School } from 'lucide-react'
import useFetch from '@/hooks/use-fetch';
import { updateApplications } from '@/api/apiapplication';
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
const ApplicationCard = ({application,isCandidte = false}) => {
    const handelDownload=()=>{
        const link=document.createElement("a");
        link.href=application?.resume;
        link.target="_blank";
        link.click();
    };

    const{loading:loadingHiringstaus,fn:fnHiringstatus} = useFetch(
        updateApplications,
        {
            job_id:application.job_id,
        }
    )
    const handelstatuschange=(status)=>{
      fnHiringstatus(status);
    }
  return (

   <Card className=" shadow-lg rounded-l ">
    {loadingHiringstaus && <BarLoader width={"100%"} color='#36d7b7'/>}
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {isCandidte ? `${application?.job?.title} at ${application?.job?.company?.name}`
            :application?.name}
            <Download size={18} className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
            onClick={handelDownload}
            />
        </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 flex-1">
        <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex gap-2 items-center'><BriefcaseBusinessIcon size={15}/> {application?.experience} years of experience </div>
            <div className='flex gap-2 items-center'><School size={15}/> {application?.education}</div>
            <div className='flex gap-2 items-center'><Boxes size={15}/>Skills: {application?.skills}</div>

        </div>
        <hr/>
    </CardContent>
    <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidte?(
            <span className='capatalize font-bold'>Status: {application?.status}</span>
        ):(
            <Select  onValueChange={handelstatuschange} defaultValue={application.status}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status"/>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>



            
              
            </SelectContent>
          </Select>
        )}
    </CardFooter>
   </Card>
  )
}

export default ApplicationCard
