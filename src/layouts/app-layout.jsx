import { Outlet } from 'react-router-dom'
import "../App.css"
import Header from '@/components/Header'

const AppLayout = () => {
  return (
    <div className>
      <div className='grid-background'></div>
     <main className='container min-h-screen'>
        <Header/>
        <Outlet/></main>
        <div className="bg-gray-800 text-gray-300 py-8 mt-10">
  <div className="container mx-auto text-center">
    <h2 className="text-2xl font-semibold tracking-wide mb-2">Made with <span className="text-red-500">❤️</span> by Omkar Walke</h2>
  </div>
</div>
      

    </div>
  )
}

export default AppLayout
