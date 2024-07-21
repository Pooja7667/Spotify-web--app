import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { SiShazam } from "react-icons/si";
import { Link , useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch  } from 'react-redux';
import Cookies from 'js-cookie';
import { auth  , createUserWithEmailAndPassword ,db} from '../../Firebase/Firebase';
import {doc ,setDoc} from "firebase/firestore";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { signupUser } from '../../Redux-toolkit/Login';
const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  useEffect(() => {
    const getToken = Cookies.get("token")
   if(getToken){

    toast.info('User Already Login ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
    navigate("/")
   }
  }, [])
  const onSubmit = async (data) => {
    // Handle form submission
    try {
      const userData = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (userData) {
      setDoc(doc(db,"users",userData.user.uid ), {
        name : data.name,
        createdAt: new Date()
      })
        // alert("Verification email sent. Please check your inbox.");
        toast.info('Verification email sent. Please check your inbox. ', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
        dispatch(signupUser({accessToken: userData.accessToken, email: userData.email}));
        navigate("/")
      }
    }
    catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please use a different email or log in.', {
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
      console.error('Error signing up:', err.code, err.message);
    
    }
   
    // console.log(userData._tokenResponse , "comp");
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <section className="py-20  bg-green-500">
        <div className="main mt-[20%]">
          <div className="flex justify-center w-[90%] md:w-[80%] mx-auto">
            <div className="my-4">
              <div className="justify-center text-4xl flex">
             Spotify
              </div>
              <div className="font-semibold justify-center flex text-2xl">
                <h2>Sign In and Sign Up</h2>
              </div>
              <div className="font-medium justify-center flex text-xl opacity-70">
                <h3>Enter your email to get started</h3>
              </div>
              <div className="w-full flex flex-col justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-4 flex justify-center flex-col">
                    <input
                      placeholder="Enter your name"
                      autoFocus
                      className="text-black px-2 border-2 border-blue-300 w-[90%] rounded-md py-3 md:w-[60%] mx-auto"
                      type="text"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <span className="text-red-500 flex justify-center">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="my-4 flex justify-center flex-col">
                    <input
                      placeholder="Enter your email"
                      className="text-black px-2 border-2 border-blue-300 w-[90%] rounded-md py-3 md:w-[60%] mx-auto"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <p className="text-red-500 flex justify-center">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="my-4 flex justify-center flex-col">
                    <input
                      placeholder="Enter your password"
                      className="text-black px-2 border-2 border-blue-300 w-[90%] rounded-md py-3 md:w-[60%] mx-auto"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500 flex justify-center">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="justify-center text-5xl flex">🧑‍🤝‍🧑</div>
                  <div className="md:w-[60%] text-xs md:text-xl mx-auto my-5">
                    <div className="flex gap-2 text-xl md:text-2xl">
                      <h3 className="flex">Already have an account? 🤔</h3>
                      <Link className="text-blue-800" to={"/login"}>
                        Login 😉
                      </Link>
                    </div>
                  </div>
                  <div className="flex w-[60%] mx-auto md:w-[40%] justify-center bg-red-600 rounded-lg">
                    <button
                      className="py-2 text-2xl text-white font-medium"
                      type="submit"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
