import React, { useEffect, useState } from "react";
import { useAxiosPrivatehook } from "../utilitis/Axiosapi";
import { Link, useParams } from "react-router-dom";

export default function Viewusers() {
  const axiosInstance = useAxiosPrivatehook();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  console.log(userId); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axiosInstance.get(`getuser/${userId}`);
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          console.error("Invalid response data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [axiosInstance, userId]); 

  if (!user) {
    
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl bg-white rounded-lg overflow-hidden shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.firstname}! Profile
          </h2>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <p className="text-gray-800">{user.firstname}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <p className="text-gray-800">{user.lastname}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            role:
          </label>
          <p className="text-gray-800">{user.roles===3?"Admin":"User"}</p>
        </div>
        <div className="flex justify-end">
          {user._id && (
            <Link
              to={`/account/edit-user/${user._id}`}
              className="text-green-500 hover:text-green-700"
            >
              Edit
            </Link>
          )}
        
          <button
        
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
