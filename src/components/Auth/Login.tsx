/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:18:48
 * @modify date 2024-10-25 11:18:48
 * @desc Login Page
 */

import * as Yup from 'yup';
import useCommonForm from '../../Global/FormHook/FormHook';
import InputField from '../../Global/FormHook/InputField';
import { Link } from 'react-router-dom';
import ApiClient from '../../Global/Apiclient';
import { ApiResponse } from '../../Global/CommonInterfaces/CommonInterface';
import { useDispatch } from 'react-redux';
import { login_success } from '../../Redux/Actions/user';
import { useToast } from '../../libs/Toast';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie'
import useCustomNavigate from '../../libs/useCustomNaviagte';


// Define validation schema for the login form
const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email/Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const showToast = useToast();
  const [RemeberMe, setRememberMe] = useState(false)
  const { register, handleSubmit, errors, reset, setValue, } = useCommonForm(loginSchema);
  const dispatch = useDispatch();
  const navigate = useCustomNavigate()
  const handleFormSubmit = (data: any) => {
    ApiClient.post<any>(`user/login`, data).then((res: ApiResponse) => {
      showToast({ ...res, fullFillHide: true })
      if (RemeberMe) {
        Cookies.set('email', data?.email, { expires: 30 })
        Cookies.set('password', data?.password, { expires: 30 })
      } else {
        Cookies.remove('email')
        Cookies.remove('password')
      }
      if (res.success) {
        dispatch(login_success(res?.data));
        Cookies.set('token', res?.data?.access_token, { expires: 30 })
        navigate('/')
      }
    })
    reset();
  };


  useEffect(() => {
    const initialEmail = Cookies.get('email') || '';
    const initialPassword = Cookies.get('password') || '';
    if (initialEmail) {
      // @ts-ignore
      setValue('email', initialEmail);
    }
    if (initialPassword) {
      // @ts-ignore
      setValue('password', initialPassword)
    }
    if (initialPassword && initialEmail) {
      setRememberMe(true)
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='bg_images'>
          <div className="font-[sans-serif]">
            <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
              <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                  <div className="space-y-4">
                    <div className="mb-8">
                      <img src='/img/logo.png' alt='logo' className='mb-4 h-20' />
                      <h3 className="text-gray-800 text-3xl font-extrabold">Sign In</h3>
                      <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
                    </div>
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">Email / Username</label>
                      <div className="relative flex items-center">
                        <InputField
                          name="email"
                          type="text"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">Password</label>
                      <div className="relative flex items-center">
                        <InputField
                          label="Password"
                          name="password"
                          type="password"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-primary focus:ring-blue-500 border-gray-300 rounded" checked={RemeberMe} onChange={e => setRememberMe(e.target.checked)} />
                        <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <Link to="/forgot-password" className="text-primary hover:underline font-semibold">
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    <div className="!mt-8">
                      <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary  focus:outline-none">
                        Log in
                      </button>
                    </div>
                    <p className="text-sm !mt-8 text-center text-gray-800">Don't have an account <Link to="/signup" className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
                  </div>
                </div>
                <div className="hidden lg:block lg:h-[400px] md:h-[300px] max-md:mt-8">
                  <img src="img/login-2.png" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Login VITE" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
