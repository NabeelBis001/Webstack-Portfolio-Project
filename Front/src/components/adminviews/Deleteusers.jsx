import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxiosPrivatehook } from '../utilitis/Axiosapi';

const DeleteUserPage = () => {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivatehook();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/getuser/${userId}`);
        const fetchedUserData = response.data;
        setUserData(fetchedUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [axiosPrivate, userId]);

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete("/delete", {
        data: { id: userId },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    
      setConfirmation(true);

      
      setTimeout(() => {
        setConfirmation(false);

        navigate('/account/view');
      }, 2000);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Delete User</h2>
      <p>
        Are you sure you want to delete the user with ID: {userId} and Name: {userData.name}?
      </p>
      {!confirmation ? (
        <div>
          <button onClick={handleDelete} className='bg-red-300 '>Yes, delete user</button > 
          <button className='bg-green-300' onClick={() => navigate('/account/view')}>No, go back</button>
        </div>
      ) : (
        <div>
          <p>User {userData.name} has been deleted.</p>
        
        </div>
      )}
    </div>
  );
};

export default DeleteUserPage;
