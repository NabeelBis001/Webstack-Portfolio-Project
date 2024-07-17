import { useEffect, useState } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import Dashboardview from "./Dashboardview";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import CreateNewUser from "./Creatusermodal";
import Viewuser from "./Viewuser";
import Profile from "./profiles";
import Viewalluser from "./Viewallusers";
import Editlluser from "./edituser";
import Editoneuser from "./Editusermodal";
import { useAxiosPrivatehook } from "../utilitis/Axiosapi";
import Error from "./Error"; 
import DeleteUserPage from "./Deleteusers";

function Account() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6 h-full overflow-y-auto bg-gray-200">
        <Sidebar />
      </div>
      <div className="w-full overflow-hidden h-full flex flex-col">
        <Dashboardview />

        <div className="overflow-y-auto flex-grow">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route
              path="/viewuser/:userId"
              element={<AsyncUserValidation component={<Viewuser />} />}
            />
            <Route path="/view" element={<Viewalluser />} />
            <Route path="/create" element={<CreateNewUser />} />
            <Route
              path="/edit-user/:userId"
              element={<AsyncUserValidation component={<Editoneuser />} />}
            />
            <Route path="/delete-user/:userId" element={<DeleteUserPage />} />
            <Route path="/edit" element={<Editlluser />} />
            <Route path="/404" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


const AsyncUserValidation = ({ component }) => {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivatehook();
  const [isValidUser, setIsValidUser] = useState(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await axiosPrivate.get(`/getuser/${userId}`);
        const userData = response.data.user;
        if (userData) {
          setIsValidUser(true);
        } else {
          setIsValidUser(false);
        }
      } catch (error) {
        setIsValidUser(false);
      }
    };

    validateUser();
  }, [axiosPrivate, userId]);

  if (isValidUser === null) {
    
    return <div>Loading...</div>;
  }

  if (!isValidUser) {
  
    return <Navigate to="/account/404" />;
  }

  return component;
};

export default Account;
