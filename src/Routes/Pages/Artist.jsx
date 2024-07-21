import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsWikipedia } from "react-icons/bs";
import { SiShazam } from "react-icons/si";
import { IoPlay } from "react-icons/io5";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import Loading from "../../Components/Loading";
const Artist = () => {
  const navigate = useNavigate()
  const getUser = Cookies.get("token")
  const {name} = useParams()
  const [id, setId] = useState(0);
  const [menu, setMenu] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);
  const artist = useSelector((state) => state.artists.artistById);
  console.log(artist, "artist page");
  const showMenu = (data) => {
    setMenu((value) => !value);
    setId(data);
  };
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
  const changeMenu = ()=>{
    if(menu){
setMenu(false)
    }
  }
  if (!artist) {
    return <><Loading/></>;
  }
      // add song to playlist 
const addToPlaylist = (image, name , artist, audio)=>{
  if(getUser){
    dispatch(setSongToPlayList(image ,name , artist, audio))
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
  }
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
  const { discography, profile, visuals } = artist.data.artist;
  return (
    <>
     <Helmet>
        <title>{name}</title>
        <meta name="description" content="Artists page includes top-songs  shazam-music apple-music free music " />
      </Helmet>
      <section onClick={changeMenu} >
        <div className="main py-20">
          <div className="">
            <div className="firs flex flex-col md:flex-row justify-center md:justify-start md:w-[80%] mx-auto ">
              <div className="name">
                <div className="py-5 px-4 flex   justify-center md:ml-8 ">
                  <img
                    src={visuals.avatarImage.sources[0].url}
                    alt="loading..."
                    className="sm:h-[350px] h-[250px] md:w-[380px] w-[250px] sm:w-[350px] shadow-neutral-900  shadow-2xl rounded-full "
                  />
                </div>
                <h1 className="text-2xl text-center md:text-start md:text-4xl font-medium text-blue-500  md:ml-24 mx-5 ">
                  Artist : {profile.name}
                </h1>
              </div>
              <div className="linsk  mt-3 flex flex-wrap md:w-[50%] md:flex-nowrap  justify-center gap-4 sm:gap-10 md:gap-5 md:flex-col ml-5 text-2xl font-medium text-slate-700  mb-10  ">
                {profile.externalLinks.items[0] && (
                  <Link
                  className="flex items-center hover:shadow-xl hover:text-blue-500 py-1 md:w-full "
                  to={profile.externalLinks.items[0].url}
                >
        
                  <FaFacebookF className="mx-3" /> Facebook
                </Link>
                )}

      { profile.externalLinks.items[1] && (
        <Link
                  className="flex items-center hover:shadow-xl hover:text-blue-500 py-1 md:w-full "
                  to={profile.externalLinks.items[1].url}
                >
                  <FaInstagram className="mx-3" />
                  Instagram
                </Link>
      ) }
                
        {profile.externalLinks.items[2] && (
          <Link
                  className="flex items-center hover:shadow-xl hover:text-blue-500 py-1 md:w-full "
                  to={profile.externalLinks.items[2].url}
                >
                  <FaSquareXTwitter className="mx-3" />
                  Twitter
                </Link>
        )}
                
                {profile.externalLinks.items[3] && (
                  <Link
                  className={` flex items-center hover:shadow-xl hover:text-blue-500 py-1 md:w-full `}
                  to={profile.externalLinks.items[3].url}
                >
                  <BsWikipedia className="mx-3" />
                  Wikipedia
                </Link>
                ) }
                
                <Link
                  className="flex items-center hover:shadow-xl hover:text-blue-500 py-1 md:w-full "
                  to={artist.data.artist.sharingInfo.shareUrl}
                >
                  <SiShazam className="mx-3" />
                  Shazam
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap h-[70vh] overflow-y-scroll mt-5 md:w-[90%] mx-auto rounded-xl p-3 shadow-2xl text-center">
              <div className="flex justify-center w-full mb-8 " ><h1 className="md:text-4xl text-2xl text-blue-800 opacity-80 font-semibold " >Biography</h1></div>
              <div>

              {profile.biography.text}
              </div>
            </div>
            <div className="main mt-10 overflow-visible relative">
              <div className="heading flex place-content-between mx-3">
                <h1 className="text-2xl">Top 10 Chart</h1>
              </div>
              <div className="songs snap-x grid grid-flow-col overflow-x-scroll grid-rows-3">
                {discography.topTracks.items.map((item, index) => (
                  <div
                    key={item.track.id}
                    className="mx-2 relative my-3 min-w-[25rem] md:w-[30rem] snap-start"
                  >
                    <div className="flex py-1 lg:py-3 rounded-2xl place-content-between hover:bg-slate-400 w-full">
                      <div className="data flex items-center mx-3">
                        <p className="text-center">{index + 1}</p>
                        <div className="image rounded-xl my-3 px-2 mx-2">
                          <img
                            className="rounded-xl h-[70px] "
                            src={item.track.album.coverArt.sources[2].url}
                            alt="loading..."
                          />
                          <div className="absolute bottom-6 lg:bottom-8 left-12  ">
                            <audio
                              ref={(el) => (audioRefs.current[index] = el)}
                              src={item.track.uri}
                            />
                            <button
                              onClick={() => togglePlay(index)}
                              type="button "
                              className="bg-slate-300 p-1 rounded-full text-center "
                            >
                              {isPlaying &&
                              currentAudio === audioRefs.current[index] ? (
                                <FaRegPauseCircle className="text-[2.5rem]" />
                              ) : (
                                <IoPlay className="text-[2.5rem]" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="hover:decoration-2 overflow-hidden font-semibold w-[10rem] h-[5vh] md:h-[4vh] hover:underline">
                            {item.track.name}
                          </h3>
                          <h3 className="hover:decoration-2 hover:underline w-[10rem] h-[5vh] md:h-[4vh]overflow-hidden ">
                            {item.track.artists.items[0].profile.name}
                          </h3>
                          <button onClick={()=>(addToPlaylist(item.track.album.coverArt.sources[2].url ,item.name ,item.artists[0].name , item.track.uri ))} className="bg-black lg:hidden rounded-md p-1 text-white">
                            Add To Playlist
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center cursor-pointer">
                        <button onClick={()=>(addToPlaylist(item.track.album.coverArt.sources[2].url ,item.name ,item.artists[0].name , item.track.uri ))} className="bg-black hidden lg:block rounded-md p-1 mx-2 text-white">
                         Add To Playlist
                        </button>
                        <div
                          onClick={() => showMenu(index)}
                          className="buttons text-2xl font-extrabold rotate-90"
                        >
                         <BsThreeDotsVertical/>
                        </div>
                        {menu && id === index && (
                          <div className="menu-div rounded-xl absolute top-16 bg-[#f1eded] shadow-2xl w-[60%] right-4 lg:left-96 z-50 py-4">
                            <div className="data flex items-center my-2 mx-3">
                              <div className="image rounded-xl py-3 px-2 mx-2">
                                <img
                                  className="rounded-md h-full w-full"
                                  src={item.track.album.coverArt.sources[2].url}
                                  alt="loading..."
                                  title={
                                    item.track.artists.items[0].profile.name
                                  }
                                />
                              </div>
                              <div>
                                <h3 className="hover:decoration-2 hover:underline overflow-hidden w-[10rem] h-[5vh] md:h-[4vh] ">
                                  {item.track.name}
                                </h3>
                                <h3 className="hover:decoration-2 hover:underline overflow-hidden w-[10rem] h-[5vh] md:h-[4vh] ">
                                  {item.track.artists.items[0].profile.name}
                                </h3>
                              </div>
                            </div>
                            <div className="mx-5 flex flex-col ">
                              <p className="mt-2 rounded-lg hover:bg-white py-1  flex px-1">
                               
                                <IoMusicalNotes className="mx-2 mt-1 " /> Open
                                in music
                              </p>
                              <p className="mt-2 rounded-lg hover:bg-white py-1 flex px-1">
                                
                                <IoMdShareAlt className="mx-2 mt-1 " /> Share
                              </p>
                              <Link
                                to={item.track.artists.items[0].uri}
                                className="mt-2 rounded-lg flex hover:bg-white py-1 px-1"
                              >
                               
                                <IoMusicalNotes className="mx-2 mt-1 " /> Go to
                                song
                              </Link>
                              <Link
                                to={item.track.artists.items[0].uri}
                                className="mt-2 rounded-lg hover:bg-white py-1 flex px-1"
                              >
                                {" "}
                                <RiAccountPinCircleFill className="mx-2 mt-1 " />{" "}
                                Go to Artist
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="bg-slate-500 py-[0.6px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Artist;
