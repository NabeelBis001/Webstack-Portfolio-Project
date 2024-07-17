import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utilitis/Authcontextprovider";
import {axiosall} from "../utilitis/Axiosapi";
import { useState, useEffect } from "react";

const Login = () => {
  const { setAuthcons} = useAuth();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    seterror("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosall.post(
        "/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

     
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const id = response?.data?.id;
      console.log(accessToken,roles,id)

      setAuthcons({  roles, accessToken, id});

    // Store data in localStorage
    
      console.log(roles);
      setemail("");
      setpassword("");
      
      const destination = roles === 2 ? "/user" : "/account";
console.log("Navigating to:", destination);
navigate(destination)

      console.log(roles);
    } catch (err) {
      if (!err?.response) {
        seterror(err.response);
      } else {
        seterror(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <p
              className={
                error
                  ? " text-firebrick bg-red-400 font-bold mb-2  "
                  : "absolute left-[-9999px]"
              }
            
            >
              {error}
            </p>
            <h1 class="mb-8 text-3xl text-center">Login</h1>


            <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-md mb-2">
              Email:
              <input
                onChange={(e) => setemail(e.target.value)}
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />
            </label>
            <label htmlFor="password" className="text-md mb-2">
              Password:
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />
            </label>
            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-[#1a27d9] text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
</form>
          
                <div class="text-grey-dark mt-6">
                    Don't have an account?  
                    <a class="no-underline border-b border-blue text-blue" href="../register/">
                        Signup
                    </a>.
                </div>
            </div>
          </div>

          <div class="text-grey-dark mt-6">
            Don't have an account?
            <a
              class="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Signup
            </a>
            .
          </div>
        </div>
      </div>
    
  );
};

export default Login;
