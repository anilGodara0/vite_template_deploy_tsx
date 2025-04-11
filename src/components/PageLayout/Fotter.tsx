/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:19:38
 * @modify date 2024-10-25 11:19:38
 * @desc Global Footer Page
 */

import { Link } from "react-router-dom";

const Footer = () => {


  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 font-sans tracking-wide  px-4 ">
      <div className="py-12 px-12">
        <div className="flex flex-wrap items-center sm:justify-between max-sm:flex-col gap-6">
          <div>
            <Link to={'/'}><img src="/img/logo.png" alt="logo" className='w-24' /></Link>
          </div>
          {/* <ul className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6">
           
          </ul> */}
        </div>
        <hr className="my-6 border-gray-500" />
        <p className="text-center text-gray-300 text-base">
          © VITE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
