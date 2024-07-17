import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../utilitis/Authcontextprovider";
import Dashboardview from "./Dashboardview";
import Sidebar from "./Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./profiles";
import Editoneuser from "./Editusermodal";
import Error from "./Error";

const AsyncUserValidation = ({  Component }) => {
  const { userId } = useParams();
  const { authcons } = useAuth();
  const navigate = useNavigate();
  const [isValidUser, setIsValidUser] = useState(null);

  useEffect(() => {
    const validateUser = () => {
      // Assuming authcons provides a function to get user data based on userId
      const userData = authcons.id

      if (userData==userId) {
        setIsValidUser(true);
      } else {
        setIsValidUser(false);
      }
    };

    validateUser();
  }, [userId, authcons]);

  if (isValidUser === null) {
    return <div>Loading...</div>;
  }

  if (!isValidUser) {
    return <Navigate to="/user/404" />;
  }

  return Component;
};

function User() {
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

            {/* Wrap Editoneuser route with user validation */}
            <Route
              path="/edit-user/:userId"
              element={<AsyncUserValidation Component={<Editoneuser />} />}
            />

            <Route path="/404" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default User;
