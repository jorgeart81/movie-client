import { NavLink } from 'react-router-dom';

import clsx from 'clsx';
import { HomeIcon } from '../icons';

interface Props {
  to: string;
  name: string;
}

export const Sidelink = ({ to, name }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6',
          { 'bg-gray-50 text-gray-800 border-indigo-500': isActive }
        )
      }>
      <span className='inline-flex justify-center items-center ml-4'>
        <HomeIcon />
      </span>
      <span className='ml-2 text-sm tracking-wide truncate'>{name}</span>
    </NavLink>
    // </NavLink>
  );
};
