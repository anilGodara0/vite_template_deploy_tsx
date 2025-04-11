import React from 'react';

type BreadcrumbProps = {
  title: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
  return (
    <div>
      <div className="md:flex items-center justify-between mb-4">
        <p className="text-3xl font-medium">{title}</p>
        <div className="">
          <ul className="bg-white rounded-full py-2 md:px-4 -space-x-4 w-max flex items-center md:mx-auto font-[sans-serif] mt-4">

            <li className="bg-primary text-white rounded-r-full z-10 shadow-[0_2px_15px_-3px_rgba(6,81,237,0.3)] px-8 py-3 text-sm font-bold ">
              {title}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
