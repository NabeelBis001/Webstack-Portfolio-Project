import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsChevronDown } from 'react-icons/bs';
import { useAuth } from '../utilitis/Authcontextprovider';




const Sidebar = () => {
  
  const { authcons } = useAuth()
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);


  const toggleSidebar = () => {
    setOpen(!open);
  };
  const Menus = [
    {
      title: 'profile system',
      src: '/user',
      icon: <FaUser />,
      subMenus: [
        {
          title: 'update profile',
          src: `/user/edit-user/${authcons.id}`,
          cName: 'sub-nav',
        },
      ],
    },
  ];
  return (
    <div className=" h-screen flex items-end justify-end ">
      {/* ... (your toggle button) */}

      <div
        className={` ${
          open ? 'w-48 px-2 ' : 'w-0 '
        } lg:w-72 bg-[#4E73DF] h-screen   relative duration-500`}
      >
        <div className=" justify-center mt-3">
          <h1
            className={`text-white  font-medium text-2xl text-center duration-200 ${
              !open && 'invisible'
            }`}
          >
            User
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#1a27d9] text-white text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'}  `}
              >
                {Menu.icon ? Menu.icon : <MdOutlineDashboard />}
                <Link to={Menu.src} className="flex-1">
                  {Menu.title}
                </Link>
                {Menu.subMenus && (
                  <BsChevronDown
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={`${subMenuOpen && 'rotate-180'}`}
                  />
                )}
              </li>
              {Menu.subMenus && subMenuOpen && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex px-5 cursor-pointer text-center hover:bg-[#1a27d9] text-sm text-gray-200 py-1"
                    >
                      <Link to={subMenuItem.src}>{subMenuItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
