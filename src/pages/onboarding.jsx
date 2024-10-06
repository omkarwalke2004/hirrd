import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    try {
      await user.update({
        unsafeMetadata: { role },
      });
      navigate(role === 'recruiter' ? '/post-job' : '/jobs');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user?.unsafeMetadata?.role === 'recruiter' ? '/post-job' : '/jobs');
    }
  }, [user, navigate]);

  // Show loader when user data is not loaded
  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <BarLoader width={'100%'} color='#36d7b7' />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center mt-28'>
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>I am a...</h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button variant='blue' className='h-36 text-2xl' onClick={() => handleRoleSelection('candidate')}>
          Candidate
        </Button>
        <Button variant='destructive' className='h-36 text-2xl' onClick={() => handleRoleSelection('recruiter')}>
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
