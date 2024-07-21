import React from 'react'
import Moblie from "../../Images/Moblie.webp"
import Qrcode from "../../Images/qrcode.webp"
const Download = () => {
  return (
    <>
    <section className='py-36 bg-gradient-to-b from-[#0bf] to-[#07f]  ' >
        <div className='lg:h-[100vh] h-full  ' > 
            <div className='flex flex-col md:flex-row  md:place-content-around' >
                <div className="image w-full order-last mt-16 md:mt-0 md:order-none md:w-3/5 flex justify-center ">
                    <img title='Shazam on mobile banner' className='md:h-[350px] md:w-[350px] lg:h-[650px] lg:w-[650px] object-contain h-[700px] w-[700px] ' src={Moblie} alt='loading...'/>
                </div>
                <div className="details w-full md:w-[48%]  flex justify-center lg:items-center md:mr-10 mr-0 ">
                    <div className=" text-white md:w-auto  w-full flex flex-col justify-center lg:justify-start ">
                        <div className=" flex justify-center mt-3 lg:justify-items-start  ">
                        <h1 className='font-bold lg:text-6xl text-2xl' >Name songs in seconds</h1>
                        </div>
                        <div className='grid justify-center lg:justify-start  mt-2 mb-4' >
                        <p className='font-medium flex text-lg' >Find music , concerts and more with Shazam</p>
                        </div>
                            
                        <div className='flex mt-3 p-3 bg-[#39aed8] mx-auto lg:mx-0 w-[90%] rounded-xl ' >
                            <div className="scaner mx-6 ">
                                <img src={Qrcode} className ="rounded-xl" title='Shazam QR Code' width={80} height={80} alt='loading...' />
                            </div>
                            <div className="description flex flex-col text-center  w-4/5 ">
                                <h3 className='font-medium' >Get the app</h3>
                                <p className='flex flex-wrap font-medium opacity-60 ' >Scan the code with your smart phone camera to download the free app</p>
                            </div>
                        </div>
                        <p className='flex justify-center lg:justify-start my-3 ' >Available on <span className='underline mx-1 ' >iOS</span><span className='underline mx-1 ' >Android</span>and <span className='underline mx-1  ' >more devices</span></p>
                    </div>
                </div>

                </div>

                 </div>
    </section>
    </>
  )
}

export default Download