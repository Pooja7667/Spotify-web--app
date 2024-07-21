import React, { useState ,useRef,useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { getSongById } from '../../Redux-toolkit/AllSongsSlice';
import { allSongsFetch } from "../../Redux-toolkit/AllSongsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { IoPlay } from "react-icons/io5";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Helmet } from 'react-helmet';
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Components/Loading';
import Cookies from 'js-cookie';
import { setSongToPlayList } from '../../Redux-toolkit/Playlist';
import { selectSearchTerm } from '../../Redux-toolkit/Search';
// import { Link } from 'react-router-dom';
const Songs = () => {
  const getUser = Cookies.get("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchQuery = useSelector(selectSearchTerm);
  const [menu, setMenu] = useState(false);
  const [bannerData , setBannerData] = useState({
    name:"",
    image: "",
    artistName:""
  })
  const songs = useSelector((state) => state.allSongs.songs);
  const [id, setId] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);
  useEffect(() => {
    if (songs && songs.length > 0) {
      setBannerData({
        name: songs[0].name,
        artistName: songs[0].artists[0].name,
        image: songs[0].album.images[1].url
      });
    }
  }, [songs]);
  
  useEffect(() => {
    dispatch(allSongsFetch());
  }, [dispatch]);
  const getSingleSongDetails = (id)=>{
   dispatch(getSongById(id))
  }
  // mange menu
    const showMenu = (data) => {
      setMenu((value) => !value);
      setId(data);
    };
    // handle audio
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
    // setSongDetails to Show 
    const setDataForBanner = (name , artist, image)=>{
        setBannerData({
          name:name,
          artistName : artist,
          image:image
        })
    }
    console.log(bannerData, "getdata")
    const changeMenu = ()=>{
      if(menu){
setMenu(false)
      }
    }
    if(!songs){
      return (
        <><Loading/></>
      )
    }


    // add song to playlist 
const addToPlaylist = (image, name , artist, audio)=>{
  const data = { 
    name ,
     image,
     artist,
     audio
   }
  if(getUser){
    dispatch(setSongToPlayList(data))
    toast.success('Added To PlayList ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  } else{
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
  
}
// filtersongs 
const filteredSongs = songs.filter((song) => 
  song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  song.artists[0].name.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <>
      <Helmet>
        <title>Songs</title>
        <meta name="description" content="Songs page includes top-songs top-artists radio-top shazam applemusic" />
      </Helmet>
    <section onClick={changeMenu} className='pt-10' >
        <div className="main">
            <div className="songs ">    
                <div className='songsList flex place-content-between flex-col md:flex-row  '>
                    <div className="songs mt-4 md:w-[auto] w-full order-last md:order-none   ">
                    {filteredSongs.map((item, index) => (
            <div onClick={()=>(setDataForBanner(item.name ,item.artists[0].name,item.album.images[1].url))} key={index} className='mx-2 my-8 w-full shadow-xl relative min-w-[30rem] snap-start'>
              <div className='flex py-1 lg:py-3 rounded-lg place-content-between hover:bg-slate-300 w-full'>
                <div className="data flex items-center mx-3">
                  <p className='text-center'>{index + 1}</p>
                  <div className="image  rounded-xl py-3 px-2 mx-2"> <img className='rounded-xl' src={item.album.images[2].url} alt="loading..." />
                    <div className={`absolute bottom-6 ${index>=9?"left-14":"left-[2.7rem]"}   `}>
                    <audio ref={(el) => (audioRefs.current[index] = el)} src={item.preview_url} />
                      <button onClick={() => togglePlay(index)} type="button " className='bg-blue-300 p-1 rounded-full opacity-60 text-center ' >
                        {isPlaying && currentAudio === audioRefs.current[index] ? <FaRegPauseCircle className='text-[2.5rem]' /> : <IoPlay className='text-[2.5rem]' />} </button>
                    </div>
                  </div>
                  <div>
                  <h3 className='hover:decoration-2 overflow-hidden font-semibold w-[10rem] h-[5vh] md:h-[4vh] hover:underline'>{item.name}</h3>
                  <h3 className='hover:decoration-2 hover:underline w-[10rem] h-[5vh] md:h-[4vh]overflow-hidden '>{item.artists[0].name}</h3>
                    <button onClick={()=>(addToPlaylist(item.album.images[2].url ,item.name ,item.artists[0].name , item.preview_url ))} className='bg-black lg:hidden rounded-md p-1 text-white'>Add To Playlist</button>
                  </div>
                </div>
                <div className='flex items-center cursor-pointer'>
                  <button onClick={()=>(addToPlaylist(item.album.images[2].url ,item.name ,item.artists[0].name , item.preview_url ))} className='bg-black hidden lg:block rounded-md p-1 mx-2 text-white'>Add To Playlist</button>
                  <div onClick={() => showMenu(index)} className="buttons text-2xl font-extrabold ">
                  <BsThreeDotsVertical/>
                  </div>
                  {menu && id === index && (
                  <div className="menu-div rounded-xl absolute top-16 lg:top-20 bg-[#f1eded] shadow-2xl w-[60%] right-4 lg:left-96 z-50 py-4">
                  <div className="data flex items-center my-2 mx-3">
                    <div className="image rounded-xl py-3 px-2 mx-2">
                      <img className='rounded-md h-full w-full' src={item.album.images[2].url} alt="loading..." title={item.name} />
                    </div>
                    <div>
                      <h3 className='hover:decoration-2 hover:underline overflow-hidden w-[10rem] h-[5vh] md:h-[4vh] '>{item.name}</h3>
                      <h3 className='hover:decoration-2 hover:underline overflow-hidden w-[10rem] h-[5vh] md:h-[4vh] '>{item.artists[0].name}</h3>
                    </div>
                  </div>
                  <div className='mx-5 flex flex-col '>
                    <Link onClick={()=>getSingleSongDetails(item.id)} to={`/songs/${item.name}`} className='mt-2 rounded-lg hover:shadow-xl hover:bg-white py-1 hover:text-blue-500 flex px-1'> <IoMusicalNotes className='mx-2 mt-1  ' /> Open in music</Link>
                    <p className='mt-2 rounded-lg hover:shadow-xl hover:text-blue-500 hover:bg-white py-1 flex px-1'> <IoMdShareAlt className='mx-2  mt-1 ' /> Share</p>
                    <Link to={item.artists[0].external_urls.spotify} className='mt-2 rounded-lg flex hover:text-blue-500 hover:shadow-xl hover:bg-white py-1 px-1'> <IoMusicalNotes className='mx-2  mt-1 ' /> Go to song</Link>
                    <Link to={item.artists[0].uri} className='mt-2 rounded-lg hover:shadow-xl hover:text-blue-500 hover:bg-white py-1 flex px-1'> <RiAccountPinCircleFill className='mx-2 mt-1 ' /> Go to Artist</Link>
                  </div>
                </div>
                  )}
                </div>
              </div>
              <hr className='bg-slate-500 py-[0.6px]' />
            </div>
          ))}  </div> 
                    <div className="show h-[90vh] md:h-full order-first md:order-none md:ml-3 pb-3 pt-4 w-full shadow-2xl  bg-white shadow-indigo-500  md:sticky top-10 ">
                        <div className="image flex my-3 justify-center items-center ">
                           <img className='h-[250px] rounded-xl mt-16 ' title={bannerData.artistName} src={bannerData.image} alt="loading" />
                           
                        </div>
                        <div className='mx-4 text-center md:text-start ' >
                            <span className='font-bold text-2xl ' >Top 200</span>
                            <h2 className='font-medium hover:underline text-xl' >{bannerData.name}</h2>
 <h2 className='font-medium hover:underline text-xl' >{bannerData.artistName} </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Songs