import type { SidemenuRoute } from '@/routes/route';
import { Sidelink } from './Sidelink';

interface Props {
  role?: string;
  username?: string;
  routes: SidemenuRoute[];
}

export const Sidemenu = ({ username = 'Username', role, routes }: Props) => {
  return (
    <div className='bg-gray-900 min-h-screen z-10 text-slate-800 w-64 h-screen overflow-y-scroll'>
      <div id='logo' className='my-4 px-6'>
        <h1 className='text-lg md:text-2xl font-bold text-white'>
          Demo<span className='text-blue-500'>Course</span>.
        </h1>
        <p className='text-slate-500 text-sm'>
          Manage your actions and activities
        </p>
      </div>
      <div className='px-6 py-10'>
        <p className='text-slate-200 mb-2'>Welcome back, </p>
        <a href='#' className='inline-flex space-x-2 items-center'>
          <span className='text-sm md:text-base font-bold text-white'>
            {username} ({role})
          </span>
        </a>
      </div>
      <nav className='w-full px-6'>
        {routes.map(({ to, name, description }) => (
          <Sidelink key={name} to={to} name={name} description={description} />
        ))}
      </nav>
    </div>
  );
};
