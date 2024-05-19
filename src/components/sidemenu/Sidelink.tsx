import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  name: string;
  description?: string;
}

export const Sidelink = ({ to, name, description }: Props) => {
  return (
    <NavLink
      to={to}
      end
      unstable_viewTransition
      className={({ isActive }) =>
        `${
          isActive && 'bg-blue-800'
        } w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150`
      }>
      <div className='flex flex-col'>
        <span className='text-lg font-bold leading-5 text-white'>{name}</span>
        {description && (
          <span className='text-sm text-white/50 hidden md:block'>
            {description}
          </span>
        )}
      </div>
    </NavLink>
  );
};
