import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox, User } from 'lucide-react'

const Header = () => {
  const[showSignin,setshowSignin]=useState(false);
const[search,setsearch]=useSearchParams();
const{user}=useUser();
useEffect(()=>{
  if(search.get('sign-in')){
    setshowSignin(true)
  }
},[search])
  const handellayoutclick=(e)=>{
    if(e.target === e.currentTarget){
      setshowSignin(false);
      setsearch({});
    }
  }
  return (
   <>
   <nav className=" p-4 flex justify-between items-center shadow-lg">
  <div className="flex items-center space-x-4">
    <Link to="/">
      <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
    </Link>
  </div>

  
   <div className='flex gap-8'>
   <SignedOut>
   <Button variant="outline" onClick={()=>setshowSignin(true)} className="px-6 py-2 text-white border-white hover:bg-white hover:text-gray-900 transition-all duration-300 ease-in-out">
    Login
  </Button>
        
      </SignedOut>
      
      <SignedIn className="flex items-center space-x-4">
  {/* Conditional rendering can be added here */}
 {user?.unsafeMetadata?.role === "recruiter" && <Link to="/post-job">
    <Button variant="destructive" className="rounded-full flex items-center space-x-2">
      <PenBox size={20} />
      <span className="hidden md:inline">Post a Job</span> {/* Hide on small screens */}
    </Button>
  </Link>}
  <UserButton appearance={{
    elements:{
      avatarBox:"w-10 h-10"
    }
  }}>
    <UserButton.MenuItems>
      <UserButton.Link
      label='My Jobs'
      labelIcon={<BriefcaseBusiness size={15}/>}
      href='my-jobs'
      />
      <UserButton.Link
      label='Saved jobs'
      labelIcon={<Heart size={15}/>}
      href='saved-job'
      />

    </UserButton.MenuItems>

  </UserButton>
</SignedIn>

   </div>
</nav>
{showSignin && <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handellayoutclick}>
  <SignIn
  signUpForceRedirectUrl='/onboarding'
  fallbackRedirectUrl='/onboarding'
  />
  </div>}

   </>
  )
}

export default Header
