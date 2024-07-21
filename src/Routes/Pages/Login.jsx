import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { SiShazam } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../Redux-toolkit/Login";
import { auth, signInWithEmailAndPassword } from "../../Firebase/Firebase";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const getToken = Cookies.get("token");
    if (getToken) {
      toast.info("Already Login User ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      if (user) {
        // console.log('User signed in:', user);
        dispatch(
          loginUser({ accessToken: user.accessToken, email: user.email })
        );
        toast.success("User Logged In", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
        // console.log(data)
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.info(
          "This email is already registered. Please use a different email or log in.",
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
      console.error("Error signing up:", error.code, error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="py-20 bg-green-600">
        <div className="main mt-[20%] ">
          <div className="flex justify-center w-[90%] ,md:w-[80%] mx-auto">
            <div className="my-4">
            
              <div className="font-semibold justify-center flex text-2xl">
                <h2>Sign IN and Sign Up</h2>
              </div>
              <div className="font-medium justify-center flex text-xl opacity-70">
                <h3>Enter your email to get started</h3>
              </div>
              <div className="w-full flex flex-col justify-center ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-4 flex justify-center flex-col ">
                    <input
                      autoFocus
                      placeholder="Enter your email"
                      className="text-black px-2 border-2 border-blue-300 w-[90%] rounded-md py-3 md:w-[60%] mx-auto"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <p className="text-red-500  flex justify-center ">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="my-4 flex justify-center flex-col ">
                    <input
                      placeholder="Enter your password"
                      className="text-black px-2 border-2 border-blue-300 w-[90%] rounded-md py-3 md:w-[60%] mx-auto"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500  flex justify-center ">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="justify-center text-5xl flex">🧑‍🤝‍🧑</div>
                    <div className=" md:w-[60%] text-xs md:text-xl mx-auto my-5 ">
                      
                        <div className="flex gap-2 md:text-2xl text-xl  ">
                          <p className="flex">Don't have account ? 🤔</p>{" "}
                          <Link className="text-blue-800" to={"/signup"}>
                            Create New Account 😉
                          </Link>
                        </div>
                    
                    </div>
                    <div className="flex w-[60%] mx-auto md:w-[40%] justify-center bg-red-600 rounded-lg ">
                      <button className="py-2 text-2xl text-white font-medium ">
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
