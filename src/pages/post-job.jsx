import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { State } from 'country-state-city';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { getCompanies } from '@/api/apicompanies';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { addNewJob } from '@/api/apiapplication';
import Addcompanydrawer from '@/components/add-company-drawer';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'description is required' }),
  location: z.string().min(1, { message: 'Select a location' }),
  company_id: z.string().min(1, { message: 'Select or add a new company' }),
  requirements: z.string().min(1, { message: 'Requirements are required' }),
});

const PostJob = () => {
  const { isLoaded, user } = useUser();
  const navigate=useNavigate();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      company_id: '',
      location: '',
      requirements: '',
    },
    resolver: zodResolver(schema),
  });
  const { fn: fnCompanies, data: companies = [], loading: loadingCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const{
    loading:loadingcreatedJob,
    error:errorCreateJob,
    data:dataCreateJob,
    fn:fnCreateJob,
  }=useFetch(addNewJob);
  const onSubmit=(data)=>{
    fnCreateJob({
      ...data,
      recruiter_id:user.id,
      isOpen:true,


    })
  }
  useEffect(()=>{
    if(dataCreateJob?.length>0)navigate("/jobs")
  },[loadingcreatedJob])
  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color='#36d7b7' />;
  }

  if (user?.unsafeMetadata?.role !== 'recruiter') {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="max-w-7xl mx-auto  rounded-lg shadow-lg text-white">
      <h1 className="gradient-title font-extrabold text-center text-5xl sm:text-7xl mb-10">Post a Job</h1>

      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" >
        <div>
          <Input
            placeholder="Job Title"
            {...register('title')}
            className="bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:ring-purple-500"
          />
          {errors.title && <p className="text-red-500 mt-2">{errors.title.message}</p>}
        </div>

        <div>
          <Textarea
            placeholder="Job description"
            {...register('description')}
            className="bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:ring-purple-500"
          />
          {errors.description && <p className="text-red-500 mt-2">{errors.description.message}</p>}
        </div>

        <div className="flex gap-4">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-purple-500">
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-white rounded-lg">
                  <SelectGroup>
                    {State.getStatesOfCountry('IN').map(({ name }) => (
                      <SelectItem key={name} value={name} className="hover:bg-gray-700">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-purple-500">
                  <SelectValue placeholder="Filter by Company">
                    {field.value ? companies.find(com => com.id === Number(field.value))?.name : 'Company'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-white rounded-lg">
                  <SelectGroup>
                    {companies.map(({ name, id }) => (
                      <SelectItem key={id} value={id} className="hover:bg-gray-700">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Addcompanydrawer fetchcompanies={fnCompanies}/>
          
        </div>

        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        {errors.company_id && <p className="text-red-500">{errors.company_id.message}</p>}

        <div>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                className="bg-gray-900 text-white border border-gray-700 rounded-lg"
                previewOptions={{
                  className: 'bg-gray-900 text-white',
                }}
              />
            )}
          />
          {errors.requirements && <p className="text-red-500 mt-2">{errors.requirements.message}</p>}
          {errorCreateJob?.message && <p className="text-red-500 mt-2">{errorCreateJob.message}</p>}

          {loadingcreatedJob && <BarLoader width={"100%"} color='#36d7b7'/>}
        </div>

        <Button type="submit" className="mt-4 w-full py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-200">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PostJob;
