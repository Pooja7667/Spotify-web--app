import React, { useEffect , useState , useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { IoPlay } from 'react-icons/io5';
import { TbPlaylistOff } from "react-icons/tb";
import { FaRegPauseCircle } from 'react-icons/fa';
const Playlist = () => {
    const getUser = Cookies.get("token")
    // const 
    const navigate = useNavigate()
    // localStorage.removeItem('playlist');
    const songs =  JSON.parse(localStorage.getItem("playlist"))
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRefs = useRef([]);
    useEffect(() => {
        if(!getUser){
            toast.error('User Not Found ', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
            navigate("/login")
        }
    }, []) 
    const togglePlay = (index) => {
        const audioRef = audioRefs.current[index];
    
        if (currentAudio && currentAudio !== audioRef) {
          currentAudio.pause();
          setIsPlaying(false);
        }
        
        if (audioRef) {
          if (isPlaying && currentAudio === audioRef) {
            audioRef.pause();
          } else {
            audioRef.play();
          }
          setIsPlaying(!isPlaying || currentAudio !== audioRef);
          setCurrentAudio(audioRef);
        }
      };

      if(!songs){
        return(
            <>
            <div className='py-20 flex justify-center  text-slate-800 flex-col w-full items-center h-[100vh] ' >
                <div className='text-4xl md:text-6xl' > <TbPlaylistOff/></div>
                <h1 className='text-xl md:text-4xl font-bold ' > This playlist is currently empty </h1>
                <h2>Find more of the music you love among our New Releases.</h2>
                <Link to={"/songs"} className='font-bold my-4 bg-black rounded-xl p-2 text-white  ' >GO TO NEW RELEASES</Link>
            </div>
            </>
        )
      }


  return (
    <>
    <section  className='w-[80%] py-28 mx-auto overflow-visible'>
      <div className="main overflow-visible relative">
        <hr className='bg-slate-400 py-[1px]'/>
        <div className="songs snap-x grid grid-flow-col overflow-x-scroll grid-rows-3">
          {songs.map((item, index) => (
            <div key={index} className='mx-2 relative my-3 min-w-[25rem] md:w-[30rem] snap-start'>
              <div className='flex py-1 lg:py-3 rounded-2xl place-content-between hover:bg-slate-400 w-full'>
                <div className="data flex items-center mx-3">
                  <p className='text-center'>{index+1}</p>
                  <div className="image rounded-xl my-3 px-2 mx-2">
                    <img className='rounded-xl' src={item.image} alt="loading..." />
                    <div className='absolute bottom-6 lg:bottom-8 left-12  '>
                      <audio ref={(el) => (audioRefs.current[index] = el)} src={item.audio} />
                      <button onClick={() => togglePlay(index)} type="button " className='bg-slate-300 p-1 rounded-full text-center ' >
                        {isPlaying && currentAudio === audioRefs.current[index] ? <FaRegPauseCircle className='text-[2.5rem]' /> : <IoPlay className='text-[2.5rem]' />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className='hover:decoration-2 overflow-hidden font-semibold w-[10rem] h-[5vh] md:h-[4vh] hover:underline'>{item.name}</h3>
                    <h3 className='hover:decoration-2 hover:underline w-[10rem] h-[5vh] md:h-[4vh]overflow-hidden '>{item.artist}</h3>
                   
                  </div>
                </div>
               
              </div>
              <hr className='bg-slate-500 py-[0.6px]' />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default Playlist