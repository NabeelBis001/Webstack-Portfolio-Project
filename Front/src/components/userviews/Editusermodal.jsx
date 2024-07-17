import React, { useState, useEffect } from "react";
import {axiosall} from "../utilitis/Axiosapi";
import {  useNavigate,useParams } from 'react-router-dom';
import { useAxiosPrivatehook } from "../utilitis/Axiosapi";

const  Editoneuser = () => {
  const axis=useAxiosPrivatehook()
    const navigate=useNavigate()
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [emsg, setrrmsg] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    setErrmsg(" ");
  }, [firstname, lastname, email, phone, password,]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axis.put(
        "/updateprofile/",
        JSON.stringify({
          password,
          email,
          phone,
          firstname,
          lastname,
          id:userId
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data)
      setrrmsg('user edited succesfully')
      setphone("");
      setfirstname("");
      setlastname("");
      setemail("");
      setpassword("");


      console.log("succes");
      console.log(response.data)
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
    <div className="flex items-center m-10 overflow-hidden  flex-col">
      <button
        className="bg-white-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
      Edit User
      </button>
      <p
              className={
                emsg
                  ? " text-firebrick bg-green-400 font-bold mb-2  "
                  : "absolute left-[-9999px]"
              }
            
            >
              {emsg}
            </p>
      
            <form onSubmit={handleSubmit} className="w-[70%]">
              
    <label htmlFor="firstname" className="text-md mb-2">firstname: 

              <input
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                type="text"
                class="flex border border-grey-light w-full p-3 rounded mb-4"
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
                value={email}
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
             
             
              <button
                type="submit"
                class="w-full text-center py-3 rounded bg-[#1a27d9] text-white hover:bg-green-dark focus:outline-none my-1"
              >
                save
              </button>
            </form>

           
    </div>
  );
};

export default Editoneuser;
