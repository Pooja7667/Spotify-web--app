import React from 'react'
import D1 from "../../Images/d1.webp"
import qrcode from "../../Images/qrcode.webp"
import { Helmet } from 'react-helmet'
const Download = () => {
  return (
    <>
     <Helmet>
        <title>Download</title>
        <meta name="description" content="Download page includes apps shazam applemusic" />
      </Helmet>
    <section>
        <div className="mai pt-24">
            <div className="images  ">
<img src={D1} alt="loading..." />

            </div>
            <div className="content mt-8 flex justify-center ">
                <div>
                    <div className='w-10/12 text-center mx-auto ' >

                    <p className='font-bold md:text-5xl text-xl ' >
                        Identify , listen and discover 
        songs with the Shazam app
                    </p>
                    <p className='w-[80%] mx-auto mt-2 font-medium ' >
                        Listen and add songs yu discover to your Ajpple Music or Spotify playlists. Sing along with time-synced lyrics. Watch your favorite music videos with Apple Music or YouTube
                    </p>
                    </div>
                    <div className='flex flex-col md:flex-row  my-10 items-center rounded-xl py-2 w-full md:w-[60%] mx-auto bg-[#eeecec] justify-center' >
                        <div className="order-last md:order-none ">
                           <img src={qrcode} className=' mix-blend-multiply ' alt="loading.." />
                        </div>
                        <div>
                            <div className='ml-4' >
                            <h2 className='font-bold text-xl' >Download the free app</h2>
                            <p className='' >Scan the code with your smart phone camera to download the free app</p>
                            </div>
                            <div className='ml-4 mt-8' >
                                <h3 className='font-semibold' >AVAILABLE ON</h3>
                                <div className="buttons text-blue-500">
                                    iOS | Android 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Download