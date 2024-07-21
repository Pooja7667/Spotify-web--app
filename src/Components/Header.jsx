import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { GrApple } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { AiOutlineSpotify } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "../Redux-toolkit/Search";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputVisible, setInputVisible] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchTerm = useSelector(selectSearchTerm);
  // user name
  const getCookies = Cookies.get("token");
  let user;
  if (getCookies) {
    let email = localStorage.getItem("userEmail");
    if (email) {
      let getName = email.split("@");
      user = getName[0];
    }
  }
  /// change color while user scroll
  const changeIcons = () => {
    setHamburger((value) => !value);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Handle visibilte of navbar
  const inputTagVisiblite = () => {
    navigate("/songs");
    setInputVisible(true);
  };
  // search text update
  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
    // console.log(event.target.value)
  };
  // logut ouser
  const logoutUser = () => {
    Cookies.remove("token");
    localStorage.clear();
  };
  return (
    <>
      <section>
        <header
          className={` z-50  py-6 font-bold  fixed w-full ${
            isScrolled ? " bg-white" : "bg-[#0c0c0c]"
          } `}
        >
          <nav>
            <div className="main  flex place-content-between  ">
              <div
                className={`flex lg:items-center lg:gap-14 ml-12  ${
                  isScrolled ? "text-black" : "text-white"
                } `}
              >
                <Link to={"/"} className="logo flex items-center ">
                  <div className="flex pl-4 pt-4">
                    <AiOutlineSpotify className="bg-green-600 rounded-full text-5xl" />
                    <h3 className="text-2xl font-bold text-green-600 p-3">
                      Spotify
                    </h3>
                  </div>
                </Link>
                <div className="links">
                  <ul className=" hidden text-sm  lg:flex lg:gap-10 ">
                    <Link to={"/download"}>GET THE APP</Link>
                    <Link to={"/playlist"}>PLAYLIST </Link>
                    <Link to={"/songs"}>CHARTS</Link>
                    <Link to={"/songs"}>RADIO SPINS</Link>
                  </ul>
                </div>
              </div>
              <div className="search flex gap-6 mr-16 ">
                <div className="flex items-center">
                  <input
                    autoFocus
                    onChange={handleSearch}
                    value={searchTerm || ""}
                    type={`${inputVisible ? "flex" : "hidden"}`}
                    className="rounded-lg mx-2 py-1 text-black font-medium px-5 "
                    placeholder="Search for songs"
                    name="Search"
                  />
                  <ImSearch
                    onClick={inputTagVisiblite}
                    className={`${isScrolled ? "text-blue-600" : "text-white"}`}
                  />
                </div>
                <div className="">
                <div className=" ">
                  {user ? (
                    <button
                      className={` hidden lg:flex   ${
                        isScrolled
                          ? " text-white"
                          : "text-green-600 bg-green-500 p-2"
                      }   rounded-md`}
                      onClick={logoutUser}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to={"/login"}
                      className={` hidden lg:flex   ${
                        isScrolled
                          ? "bg-green-600 text-white pb-0"
                          : "bg-green-500 text-green-600"
                      }`}
                    >
                      login
                    </Link>
                  )}

                  <div onClick={changeIcons} className="flex lg:hidden">
                    <GiHamburgerMenu
                      className={`text-2xl ${
                        isScrolled ? "text-blue-600" : "text-white"
                      }`}
                    />
                  </div>
                </div></div>
              </div>
            </div>
            {/* header change on Screen Size */}
            <div
              onClick={changeIcons}
              className={`fixed pt-5 inset-0 ${
                hamburger ? "translate-x-0" : "translate-x-full"
              } z-[10] top-0 bottom-0 right-0 w-full overflow-x-hidden overflow-y-auto text-white bg-black transform transition-transform duration-300 cubic-bezier(0.4, 0.2, 0, 1)`}
            >
              <div className="logo flex place-content-between mx-16  text-white ">
                <div>Logo</div>
                <div className="close">
                  <GrClose className=" text-2xl text-white " />
                </div>
              </div>
              <div className="w-full">
                <ul className="text-white grid grid-cols-1 gap-14 text-xl items-center mx-10 mt-10 ">
                  <Link to={"/download"}>Download Shazam </Link>
                  <Link to={"/playlist"}>Playlist</Link>
                  <Link to={"/songs"}>Charts</Link>
                  <Link to={"/songs"}>Radio Spins</Link>
                  <Link
                    to={
                      "https://support.apple.com/en-in/guide/shazam/welcome/web"
                    }
                  >
                    Help
                  </Link>
                </ul>
              </div>
              <div className="w-auto flex place-content-between p-8 rounded-lg mt-5  mx-14 bg-gray-600 ">
                <p>
                  Connect to Apple Music to play songs in full within Spotify .
                </p>
                <div className="flex">
                  {user ? (
                    <button
                      onClick={logoutUser}
                      className=" flex text-blue-600 bg-white rounded-md p-1 "
                    >
                      LOGOUT <FiLogOut className="mt-1 ml-2" />
                    </button>
                  ) : (
                    <Link
                      to={"/login"}
                      className=" flex text-blue-600 bg-white rounded-md p-1 "
                    >
                      CONNECT <GrApple className="mt-1 ml-2" /> MUSIC
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </section>
    </>
  );
};

export default Header;
