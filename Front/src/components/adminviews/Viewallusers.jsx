import React, { useEffect, useState } from "react";
import { useAxiosPrivatehook } from "../utilitis/Axiosapi";
import { Link } from "react-router-dom";

export default function Viewalluser() {
  const axiosInstance = useAxiosPrivatehook();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getalluser");
        setUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div className="flex i overflow-hidden  flex-col">
      <div >
        <div className=" flex flex-col items-center justify-right bg-white">
        
        </div>
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox" className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    firstname
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    lastname
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                  >
                    View Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 pl-4">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {user.firstname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {user.lastname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link to={`/account/viewuser/${user._id}`} className="text-green-500 hover:text-green-700">
  View
</Link>

                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link to={`/account/delete-user/${user._id}`} className="text-red-500 hover:red-green-700">
  Delete
</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
