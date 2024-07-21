import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allSongsFetch } from "../../Redux-toolkit/AllSongsSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoPlay } from "react-icons/io5";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { setSongToPlayList } from "../../Redux-toolkit/Playlist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loading from "../../Components/Loading";
const TopSongs = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.allSongs.songs);
  const [id, setId] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);
  const getUser = Cookies.get("token");

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

  useEffect(() => {
    dispatch(allSongsFetch());
  }, [dispatch]);

  if (!songs) {
    return (
      <>
        <Loading />
      </>
    );
  }
  const changeMenu = () => {
    if (menu) {
      setMenu(false);
    }
  };
  // add song to playlist
  const addToPlaylist = (image, name, artist, audio) => {
    const data = {
      name,
      image,
      artist,
      audio,
    };
    if (getUser) {
      dispatch(setSongToPlayList(data));
      toast.success("Added To PlayList ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("User Not Found ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    }
  };

  return (
    <>
      <section
        onClick={changeMenu}
        className="w-[80%] mx-auto overflow-visible"
      >
        <div className="main overflow-visible relative">
          <div className="heading flex place-content-between mx-3">
            <h1 className="text-2xl">Global Top 200 Chart</h1>
            <Link to={"/songs"} className="text-blue-600 font-semibold">
              SEE ALL {">"}
            </Link>
          </div>
          <hr className="bg-slate-400 py-[1px]" />
          <div className="songs snap-x grid grid-flow-col overflow-x-scroll grid-rows-3">
            {songs.map((item, index) => (
              <div
                key={item.id}
                className="mx-2 relative my-3 min-w-[25rem] md:w-[30rem] snap-start"
              >
                <div className="flex py-1 lg:py-3 rounded-2xl place-content-between hover:bg-slate-400 w-full">
                  <div className="data flex items-center mx-3">
                    <p className="text-center">{index + 1}</p>
                    <div className="image rounded-xl my-3 px-2 mx-2">
                      <img
                        className="rounded-xl"
                        src={item.album.images[2].url}
                        alt="loading..."
                      />
                      <div className="absolute bottom-6 lg:bottom-8 left-12  ">
                        <audio
                          ref={(el) => (audioRefs.current[index] = el)}
                          src={item.preview_url}
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
                        {item.name}
                      </h3>
                      <h3 className="hover:decoration-2 hover:underline w-[10rem] h-[5vh] md:h-[4vh]overflow-hidden ">
                        {item.artists[0].name}
                      </h3>
                      <button
                        onClick={() =>
                          addToPlaylist(
                            item.album.images[2].url,
                            item.name,
                            item.artists[0].name,
                            item.preview_url
                          )
                        }
                        className="bg-black lg:hidden rounded-md p-1 text-white"
                      >
                       
                        Add To Playlist
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <button
                      onClick={() =>
                        addToPlaylist(
                          item.album.images[2].url,
                          item.name,
                          item.artists[0].name,
                          item.preview_url
                        )
                      }
                      className="bg-black hidden lg:block rounded-md p-1 mx-2 text-white"
                    >
                      {" "}
                      Add To Playlist
                    </button>
                    <div
                      onClick={() => showMenu(index)}
                      className="buttons text-2xl font-extrabold "
                    >
                      <BsThreeDotsVertical />
                    </div>
                    {menu && id === index && (
                      <div className="menu-div rounded-xl absolute top-16 bg-[#f1eded] shadow-2xl w-[60%] right-4 lg:left-96 z-50 py-4">
                        <div className="data flex items-center my-2 mx-3">
                          <div className="image rounded-xl py-3 px-2 mx-2">
                            <img
                              className="rounded-md h-full w-full"
                              src={item.album.images[2].url}
                              alt="loading..."
                              title={item.name}
                            />
                          </div>
                          <div>
                            <h3 className="hover:decoration-2 hover:underline overflow-hidden w-[10rem] h-[5vh] md:h-[4vh] ">
                              {item.name}
                            </h3>
                            <h3 className="hover:decoration-2 hover:underline overflow-hidden w-[10rem] h-[5vh] md:h-[4vh] ">
                              {item.artists[0].name}
                            </h3>
                          </div>
                        </div>
                        <div className="mx-5 flex flex-col ">
                          <p className="mt-2 rounded-lg hover:bg-white py-1  flex px-1">
                            {" "}
                            <IoMusicalNotes className="mx-2 mt-1 " /> Open in
                            music
                          </p>
                          <p className="mt-2 rounded-lg hover:bg-white py-1 flex px-1">
                            {" "}
                            <IoMdShareAlt className="mx-2 mt-1 " /> Share
                          </p>
                          <Link
                            to={item.artists[0].external_urls.spotify}
                            className="mt-2 rounded-lg flex hover:bg-white py-1 px-1"
                          >
                            {" "}
                            <IoMusicalNotes className="mx-2 mt-1 " /> Go to song
                          </Link>
                          <Link
                            to={item.artists[0].uri}
                            className="mt-2 rounded-lg hover:bg-white py-1 flex px-1"
                          >
                            {" "}
                            <RiAccountPinCircleFill className="mx-2 mt-1 " /> Go
                            to Artist
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
      </section>
    </>
  );
};

export default TopSongs;
