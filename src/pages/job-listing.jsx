import { getCompanies } from '@/api/apicompanies';
import { getJobs } from '@/api/apiJobs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import JobCard from '@/components/ui/JobCard';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
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
import { State } from 'country-state-city';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'; // Import the pagination components

const Joblisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
  const { isLoaded } = useUser();

  // Initialize dataJobs as an empty array by default
  const { fn: fnJobs, data: dataJobs = [], loading: loadingJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery
  });

  const { fn: fnCompanies, data: companies = [] } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");

    if (query) {
      setSearchQuery(query);
    }
  };

  const Clearfilters = () => {
    setLocation("");
    setCompanyId("");
    setSearchQuery("");
    setPage(1); // Reset page to 1 when filters are cleared
  };

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  // Calculate total pages
  const totalPages = Math.ceil(dataJobs.length / itemsPerPage);

  // Slice the data for the current page
  const currentJobs = dataJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1>

      <div className='pl-20 pr-20'>
        <form onSubmit={handleSearch} className='h-14 flex w-full gap-2 items-center mb-5'>
          <Input 
            type="text" 
            placeholder="Search Jobs by Title..." 
            name="search-query" 
            className="h-full flex-1 px-4 text-md text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
          />
          <Button 
            type="submit" 
            className="h-full sm:w-28 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition ease-in-out duration-150">
            Search
          </Button>
        </form>

        <div className='flex flex-col sm:flex-row gap-4 mb-6'>
          <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-700 text-white rounded-lg">
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => (
                  <SelectItem key={name} value={name} className="hover:bg-gray-700">
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
            <SelectTrigger className="bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500">
              <SelectValue placeholder="Filter by Company" />
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

          <Button 
            onClick={Clearfilters} 
            variant="destructive" 
            className="sm:w-1/2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition ease-in-out duration-150">
            Clear Filters
          </Button>
        </div>
      </div>

      {loadingJobs && (
        <BarLoader className='mt-4' width={"100%"} color='#36d7b7' />
      )}

      {!loadingJobs && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pl-20 pr-20 rounded-lg'>
          {Array.isArray(currentJobs) && currentJobs.length ? (
            currentJobs.map((job) => (
              <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
            ))
          ) : (
            <div className='text-center text-gray-300'>
              <span>No Jobs Found 👎</span>
            </div>
          )}
        </div>
      )}

      {!loadingJobs && (
        <Pagination className='flex justify-center mt-6'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>

            {/* Dynamically generate pagination links */}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(index + 1)}
                  isActive={index + 1 === page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext 
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Joblisting;
