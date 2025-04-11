/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:20:32
 * @modify date 2024-10-25 11:20:32
 * @desc User View Profile
 */

import { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { LuUser } from 'react-icons/lu';
import { MdPassword } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { helper } from '../../libs/HelperPipe';
import { selectUser } from '../../libs/UserStore';
const Profile = () => {
  const user = useSelector(selectUser);
  const [EditProfil, setEditProfil]: any = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // State to manage the active tab
  return (
    <>
      <div className="wrapper_section  px-4 py-6 lg:py-20">
        <div className="max-w-3xl mx-auto   ">
          <TabGroup>
            <TabList className="flex gap-2">
              <Tab
                className={`${activeIndex === 0 ? 'bg-primary text-white' : 'bg-gray-200'
                  } p-2 cursor-pointer transition-colors focus:outline-0 flex gap-2 items-center duration-300`}
                onClick={() => setActiveIndex(0)} // Update the active index on click
              >
                <LuUser /> Profile
              </Tab>
              <Tab
                className={`${activeIndex === 1 ? 'bg-primary text-white' : 'bg-gray-200'
                  } p-2 cursor-pointer transition-colors focus:outline-0 flex gap-2 items-center duration-300`}
                onClick={() => setActiveIndex(1)} // Update the active index on click
              >
                <MdPassword /> Change Password
              </Tab>
            </TabList>
            <TabPanels className="inner_part sm:mt-3 md:mt-6 p-6  shadow-box overflow-hidden rounded-lg bg-[#f8f9fa]">
              <TabPanel>
                <div className="flex items-center  justify-between">
                  {!EditProfil && (
                    <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                      Profile Information
                    </h3>
                  )}
                  {!EditProfil && <p className="px-2 cursor-pointer lg:!px-4 text-xs font-normal bg-[#1e73be]  text-white py-2.5 flex items-center justify-center gap-2 rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed"
                    onClick={() => setEditProfil(true)}
                  >
                    <AiTwotoneEdit />
                    Edit Profile
                  </p>}
                </div>
                {!EditProfil ? <div className="proiles_sec bg-white rounded-[10px] shadow p-4 mt-6">
                  <div className="flex items-center justify-center sm:justify-start flex-wrap sm:flex-nowrap gap-4 ">
                    <div className="shrink-0">
                      <img
                        src={helper.ImagePathSettter(user?.image)}
                        className="h-36 w-36 rounded-lg object-cover mx-auto"
                      />
                    </div>
                    <div className="flex flex-col gap-y-4 ml-4 w-full sm:border-l border-dashed border-gray-400 pl-5">
                      <div>
                        <label className="text-gray-500 text-xs">Name</label>
                        <p className="font-medium text-gray-700 flex items-center gap-2 text-md capitalize">
                          {user?.fullName}
                        </p>
                      </div>
                      <div>
                        <label className="text-gray-500 text-xs">Username</label>
                        <p className="font-medium text-gray-700 flex items-center gap-2 text-md">
                          {user?.username}
                        </p>
                      </div>
                      <div>
                        <label className="text-gray-500 text-xs">Email</label>
                        <p className="font-medium text-gray-700 flex items-center gap-2 text-md">
                          {user?.email}
                        </p>
                      </div>

                      <div>
                        <label className="text-gray-500 text-xs">Mobile No</label>
                        <p className="font-medium text-gray-700 flex items-center gap-2 text-md">
                          {user?.mobileNo ? user?.mobileNo?.includes('+') ? user?.mobileNo : '+' + user?.mobileNo : '----'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> : <EditProfile setEditProfil={setEditProfil} />}
              </TabPanel>
              <TabPanel>
                <div className=''>
                  <ChangePassword />
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </>
  );
};

export default Profile;
