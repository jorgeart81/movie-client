import { useAuthStore } from '@/store';
import { useFormik } from 'formik';

interface LoginForm {
  email: string;
  password: string;
}

const initialValues: LoginForm = {
  email: 'admin@example.com',
  password: 'secret',
};

const Login = () => {
  const login = useAuthStore.getState().login;

  const { values, handleChange, handleSubmit } = useFormik<LoginForm>({
    initialValues,
    onSubmit: async (values: LoginForm) => {
      await login(values.email, values.password);
    },
  });

  return (
    <>
      <div className='bg-gray-100 flex justify-center items-center h-screen'>
        <div className='w-1/2 h-screen hidden lg:block'>
          <img
            src='https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat'
            alt='Placeholder Image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
          <h1 className='text-2xl font-semibold mb-4'>Login</h1>
          <form method='POST' noValidate onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-600'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-600'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <input
                type='checkbox'
                id='remember'
                name='remember'
                className='text-blue-500'
              />
              <label htmlFor='remember' className='text-gray-600 ml-2'>
                Remember Me
              </label>
            </div>

            <div className='mb-6 text-blue-500'>
              <a href='#' className='hover:underline'>
                Forgot Password?
              </a>
            </div>

            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
              Login
            </button>
          </form>

          <div className='mt-6 text-blue-500 text-center'>
            <a href='#' className='hover:underline'>
              Sign up Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
