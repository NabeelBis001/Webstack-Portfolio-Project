import React, { useState ,useEffect} from 'react'
import { FaSearch, FaEnvelope, FaRegBell } from "react-icons/fa"
import profile from "../../assets/profile.png"
import { useAxiosPrivatehook } from '../utilitis/Axiosapi';
import { useAuth } from '../utilitis/Authcontextprovider';
import Logoutlogger from '../utilitis/logout';

const Dashboardview = () => {
  const logout=Logoutlogger()
    const [user, setUser] = useState(null);
    const {authcons}=useAuth()

    const axiosInstance = useAxiosPrivatehook();
    const [open, setOpen] = useState(false)

    const showProfile = () => {
        
        setOpen(!open)
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(`getuser/${authcons.id}`);
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
      }, [axiosInstance, authcons.id]);
    
      if (!user) {
    
        return null;
      }
    
    return (
        <div className=''>
            <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px] '>
                <div className='flex items-center rounded-[5px]'>
                    <input type="text" className=' bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Search for...' />
                    <div className='bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                        <FaSearch color='white' />
                    </div>

                </div>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                        <FaRegBell />
                        <FaEnvelope />
                    </div>
                    <div className='flex items-center gap-[15px] relative' onClick={showProfile} >
                        <p>{user.firstname}</p>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40' >
                            <img src={profile} alt="" />

                        </div>

                        {
                            open &&
                            <div className='bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]'>
                                <p className='cursor-pointer hover:text-[blue] font-semibold'>Profile</p>
                                <p className='cursor-pointer hover:text-[blue] font-semibold'>Settings</p>
                                <p className='cursor-pointer hover:text-[blue] font-semibold' onClick={logout}>Log out</p>
                            </div>

                        }



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboardview