import React, { useState, useEffect } from "react";
import {axiosall} from "../utilitis/Axiosapi";
import {  useNavigate, } from 'react-router-dom';


const Register = () => {
    const navigate=useNavigate()
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [confirm, setcomfirm] = useState("");
  const [password, setpassword] = useState("");
  const [errmsg, setErrmsg] = useState("");

  useEffect(() => {
    setErrmsg(" ");
  }, [firstname, lastname, email, phone, password, confirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosall.post(
        "/register",
        JSON.stringify({
          password,
          confirm,
          email,
          phone,
          firstname,
          lastname,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setphone("");
      setfirstname("");
      setlastname("");
      setcomfirm("");
      setemail("");
      setpassword("");
      navigate("/login")

      console.log("succes");
    } catch (err) {
      if (!err?.response) {
        setErrmsg("No Server Response");
      } else {
        console.log(err.response.data);
        setErrmsg(err.response.data.message);
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
                errmsg
                  ? " text-firebrick bg-red-400 font-bold mb-2  "
                  : "absolute left-[-9999px]"
              }
            
            >
              {errmsg}
            </p>

            <h1 class="mb-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={handleSubmit}>
    <label htmlFor="firstname" className="text-md mb-2">firstname: 

              <input
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstname"
                placeholder="First Name"
              />
</label>
<label htmlFor="lastname" className="text-md mb-2">lastname: 

              <input
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastname"
                placeholder="Last Name"
              />
</label>
<label htmlFor="phone" className="text-md mb-2">Phone: 

              <input
                onChange={(e) => setphone(e.target.value)}
                value={phone}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phone"
                placeholder="Phone Number"
              />
</label>
<label htmlFor="email" className="text-md mb-2">Email: 
              <input
                onChange={(e) => setemail(e.target.value)}
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />
</label>
<label htmlFor="password" className="text-md mb-2">Password: 
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />
              </label>
              <label htmlFor="confirm" className="text-md mb-2">Confirm password: 
              <input
                value={confirm}
                onChange={(e) => setcomfirm(e.target.value)}
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm"
                placeholder="Confirm Password"
              />
</label>
              <button
                type="submit"
                class="w-full text-center py-3 rounded bg-[#1a27d9] text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>

            <div class="text-center text-sm text-grey-dark mt-4">Sign up</div>
          </div>

          <div class="text-grey-dark mt-6">
            Already have an account?
            <a
              class="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
