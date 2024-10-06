import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from './../components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import companies from "./../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import Faq from "./../data/Faq.json";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './../components/ui/accordion';

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col tracking-tighter py-4 items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl'>
          Find Your Dream Job{" "}
          <span className='flex items-center gap-2 lg:gap-6'>and get <img src='/logo.png' alt='Hirrd Logo' className='h-14 sm:h-24 lg:h-32'/></span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Exploring thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div className='flex gap-6 justify-center'>
        <Link to='/jobs'>
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">Post a Job</Button>
        </Link>
      </div>

      {/* Add class name to Carousel container */}
      <Carousel
        className="carousel-container w-full py-10"
        plugins={[
          Autoplay({
            delay: 2000,
            disableOnInteraction: false,
          }),
        ]}
        loop={true}
        speed={800}
        easing="ease-in-out"
      >
        <CarouselContent className="carousel-content">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="flex justify-center items-center basis-1/3 lg:basis-1/6">
              <img src={path} alt={name} className='h-12 sm:h-20 object-contain' />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className='p-16'>
        <img src="/banner.jpeg" alt="" className='w-full object-cover' />
      </div>

      <section className='p-12 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidate.
          </CardContent>
        </Card>
      </section>

      <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
        <Accordion type="single" collapsible className="space-y-4">
          {Faq.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-gray-700">
                <AccordionTrigger className="text-lg font-semibold text-white hover:text-gray-300 transition duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 mt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </main>
  );
};

export default LandingPage;
