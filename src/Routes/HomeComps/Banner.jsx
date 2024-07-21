import React from 'react'
import { Link } from 'react-router-dom'
import { SiShazam } from 'react-icons/si'
const Banner = () => {
  
  return (
    <>
    <section>
      {/* <div className="main bg-[#0324c8cc] h-[70vh] w-[90%] mx-auto my-20 flex items-center ">
            <div className='' >
              <div className="text-white mx-10 ">
                <div>logo</div>
                <div className='flex gap-2' >
                  <spna>New</spna><li>Radio Spins</li>
                </div>
                <div className="text-3xl">
                  Check out Shazam's new airplay charts. Discover current global radio trens.
                </div>
                <div className="button my-5 ">
                  <button className='bg-white text-[blue] rounded-xl p-2  ' type="button">View Now </button>
                </div>
              </div>
            </div>
      </div> */}
      <div className='w-full h-[100vh] bg-slate-200  py-20 pb-0  shadow-2xl' >
      <div className="h-[80%] my-auto bg-gradient-to-b from-blue-900 to-blue-500 w-[85%] mx-auto rounded-xl relative overflow-hidden">
   
    <div className="absolute inset-0 mt-5 vertical-lines"></div>
    
 <div className='flex w-[95%] mx-auto items-center h-full '>
    <div className=" text-white flex flex-col p-8">
      <p className='text-3xl' ><SiShazam/></p>
      <p className="text-xl font-medium">New · Radio Spins</p>
      <div className='flex w-[70%] ' >
      <span className="md:text-3xl text-2xl  font-bold">Check out Shazam’s new airplay charts.
      Discover current global radio trends.</span>
      </div>
      <Link to={"/download"} className="md:mt-24 mt-8 px-4 text-center py-2 bg-white text-blue-900 font-bold w-full md:w-[20%] rounded-full">VIEW NOW</Link>
    </div>
    </div>
  </div></div>
    </section>
    </>
  )
}

export default Banner