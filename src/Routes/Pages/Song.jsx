import React, { useState ,useRef } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoPlay } from "react-icons/io5";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading';
const Song = () => {
    const {songname} = useParams()
    const song = useSelector((state)=>state.allSongs.songById)
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef([]);
//   console.log(song.tracks[0])
  if(!song){
    return(
        <><Loading/></>
    )
  }else{
  const {name , popularity,album, preview_url,uri,artists} = song.tracks[0]
  const togglePlay = () => {
      if (currentAudio && currentAudio !== audioRef.current) {
          currentAudio.pause();
          setIsPlaying(false);
        }
        if (audioRef.current) {
            if (isPlaying && currentAudio === audioRef.current) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying || currentAudio !== audioRef.current);
            setCurrentAudio(audioRef.current);
        }
    };
  return (
    <>
    <Helmet>
        <title>{songname}</title>
        <meta name="description" content="Song page includes top-songs top-artists radio-top shazam applemusic" />
      </Helmet>
    <section className='h-auto' >
        {/* <div className="name">nameis </div> */}
        <div className="main pt-20   bg-[#e6e4e4]  ">
            <div className="top  bg-white  py-16 grid md:flex w-full justify-center md:justify-start md:items-center  ">
                <div className="image mx-4   flex items-center justify-center  ">
                 <img className='rounded-xl h-[270px] w-[500px]  ' src={album.images[0].url} alt="loading..." />
                    <div className={`absolute }`}>
                    <audio ref={audioRef} src={preview_url} />
                                <button onClick={togglePlay} type="button" className='bg-blue-300 p-1 rounded-full opacity-60 text-center'>
                                    {isPlaying && currentAudio === audioRef.current ? <FaRegPauseCircle className='text-[2.5rem]' /> : <IoPlay className='text-[2.5rem]' />}
                                </button>
                    </div>
                </div>
                <div className='md:mx-4 my-10 flex flex-col  text-center md:text-start ' >
                    <Link to={uri} className='text-3xl font-semibold'  >{name} </Link>
                    <Link to={artists[0].uri} className='text-xl my-2 font-semibold ' >{artists[0].name} </Link>
                    <div className='my-5 md:flex md:items-center ' >
                    <span className='mb-10 mt-1 md:mb-0 md:mt-0' >Pop</span><li className='ml-2' >Loved {popularity} people</li>
                    </div>
                    <div className=' flex gap-4 justify-center md:justify-start ' >
                        <Link to={uri} className='rounded-full text-white bg-black py-2 px-4 flex gap-2 items-center ' type="button"> <IoMusicalNotes className='text-4xl text-white bg-[#ff2600] rounded-full py-1 text-center pr-1 font-medium  ' /> PLAY FULL SONG</Link>
                        <button className='rounded-full text-black bg-white py-2 px-4 ' type="button">SHARE</button>
                    </div>
                </div>

            </div>
           
        </div>
    </section>
    </>
  )
  }
}

export default Song