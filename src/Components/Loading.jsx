import React from 'react'
import "./loading.css"
const Loading = () => {
  return (
    <>
    <div className="bg-white h-[100vh] flex-col flex items-center justify-center text-4xl  ">
        
        <div className="loader "></div>
        <div className='mt-10 text-xl font-semibold text-blue-400 loading ' ></div>
    </div>
    </>
  )
}

export default Loading