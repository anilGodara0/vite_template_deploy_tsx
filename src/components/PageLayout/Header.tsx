import { useEffect, useState } from "react";
import useCustomNavigate from "../../libs/useCustomNaviagte";
import moment from 'moment'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { TbLogout2 } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import { AiOutlineBell } from "react-icons/ai"; // Import notification icon
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/user";
import Cookies from "js-cookie";
import { helper } from "../../libs/HelperPipe";
import { Link } from "react-router-dom";
import { selectUser } from "../../libs/UserStore";
import ApiClient from "../../Global/Apiclient";
import { ApiResponse } from "../../Global/CommonInterfaces/CommonInterface";
import socket from "../../Global/Apiclient/SocketClient";


const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleNotification = () => {
    GetNotifications()
    setIsNotificationOpen(!isNotificationOpen);
  };
  const Logout = () => {
    Cookies.remove('token');
    dispatch(logout());
    navigate('/login');
  }
  const GlobalLinks = [
    { name: 'Home', link: '/' },
  ]
  const Menus = GlobalLinks
  const [Notifications, setNotifications] = useState([]);
  const [NotificationTotal, setNotificationTotal] = useState(0);
  const [NotificationLoader, setNotificationLoader] = useState(false);
  const GetNotifications = () => {
    setNotificationLoader(true);
    ApiClient.get<any>(`user/notifications?to=${user?._id || user?.id}&page=1&count=10000&isRead=false`).then((res: ApiResponse) => {
      if (res.success) {
        setNotificationTotal(res?.data?.length)
        setNotifications(res?.data)
      }
      setNotificationLoader(false)
    })
  }
  useEffect(() => {
    if (user?.id || user?._id) {
      GetNotifications()
    }
  }, [])
  useEffect(() => {
    socket.on(`notification-sent`, (data: any) => {
      if (data?.data?.to == user?.id) {
        setNotificationTotal(data?.data?.unread_count)
      }
    })
  }, [])
  const NotificationReader = (id: any = '') => {
    ApiClient.put<any>('user/notification/read', {
      "id": id,
      "isRead": true
    }).then((res: ApiResponse) => {
      if (res.success) {
        GetNotifications()
      }
    })
  }
  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white  dark:bg-black font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to='/'>
          <img src="/img/logo.png" alt="logo" className="w-16" />
        </Link>
        <div
          id="collapseMenu"
          className={`${isMenuOpen ? "block" : "hidden"
            } max-lg:hidden lg:block max-lg:fixed max-lg:bg-black  max-lg:inset-0 max-lg:z-50`}
        >
          {/* Close button */}
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              />
            </svg>
          </button>
          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link to={'/'}>
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </Link>
            </li>
            {Menus.map((item, index) => (
              <li key={index} onClick={() => toggleMenu()} className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <Link className={`hover:text-[#1e73be] text-gray-500 block font-semibold text-[15px]`} to={item?.link}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {user?.loggedIn && <button id="toggleOpen" className="lg:hidden" onClick={toggleMenu}>
          <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 100 2h14a1 1 0 100-2H3zm0 6a1 1 0 100 2h14a1 1 0 100-2H3zm0 6a1 1 0 100 2h14a1 1 0 100-2H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>}
        <div className="flex items-center max-lg:ml-auto space-x-2">
          <div className="relative w-10">
            <div onClick={toggleNotification} className="relative cursor-pointer">
              <div className="relative inline-flex">
                <AiOutlineBell className="text-3xl text-gray-500" />
                {NotificationTotal ? <p className="absolute top-0 bg-primary h-5 w-5 flex items-center justify-center rounded-xl text-white text-xs  -right-2">  {NotificationTotal}</p> : null}
              </div>
              {isNotificationOpen && (
                <div className="absolute right-0 w-72 max-h-96 overflow-auto mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {NotificationLoader ? <div className="text-center py-3 text-sm ">Loading...</div> :
                    <div className="px-4 py-3 ">
                      {Notifications?.map((item: any) => (<div onClick={() => NotificationReader(item?.id || item?._id)} className="pb-2  hover:text-[#1e73be] ">
                        <div className="flex gap-2 ">
                          <div className="h-2 w-2 mt-2 rounded-full bg-primary"> </div>
                          <div className="w-full ">
                            <p className="font-semibold text-sm text-black hover:underline"> {item?.type} </p>
                            <p className="font-normal text-sm text-gray-700 line-clamp-2 hover:underline">{item?.discription}</p>
                            <div className="flex mt-2 border-t border-gray-100 pt-2  items-end justify-end text-xs text-gray-600 font-normal">{moment(item?.createdAt).format('DD,MMM hh:mm A')}</div>
                          </div>
                        </div>
                      </div>))}
                    </div>}
                  {Notifications?.length == 0 ? <div className="text-center mb-2">No Notification </div> : null}
                </div>
              )}
            </div>
          </div>
          {!user?.loggedIn && <>
            <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#1e73be] bg-[#1e73be] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#1e73be]" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#1e73be] bg-[#1e73be] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#1e73be]" onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </>}
          {user?.loggedIn && <>
            <Menu>
              <MenuButton className="">
                <img src={helper.ImagePathSettter(user?.image)} className="h-10 w-10 shadow border-2 border-primary rounded-lg " />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white shadow z-50 mt-4 p-1 text-sm/6 text-primary transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={() => navigate('/profile')}>
                    <LuUser className="size-4 text-primary" />
                    Profile
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={Logout}>
                    <TbLogout2 className="size-4 text-primary" />
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </>}
        </div>
      </div>
    </header>
  );
};
export default Header;