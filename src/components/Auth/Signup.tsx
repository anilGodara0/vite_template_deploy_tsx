/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:19:12
 * @modify date 2024-10-25 11:19:12
 * @desc User Signup Form 
 */

import * as Yup from 'yup';
import useCommonForm from '../../Global/FormHook/FormHook';
import InputField from '../../Global/FormHook/InputField';
import { HiOutlineMail } from "react-icons/hi";
import ApiClient from '../../Global/Apiclient';
import { ApiResponse } from '../../Global/CommonInterfaces/CommonInterface';
import { Link } from 'react-router-dom';
import { useToast } from '../../libs/Toast';
import useCustomNavigate from '../../libs/useCustomNaviagte';
const signupSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter username').min(4, 'Please enter a valid username'),
  email: Yup.string().email('Please enter a valid email').required('Please enter a email'),
  password: Yup.string().required('Password is required').min(8, 'Password must be eight character')
});

const SignupFrom = () => {
  const { register, handleSubmit, errors, reset } = useCommonForm(signupSchema);
  const showToast = useToast()
  const Navigate = useCustomNavigate()
  const handleFormSubmit = (data: any) => {
    ApiClient.post<any>(`user/register`, { ...data, role: 'user' }).then((res: ApiResponse) => {
      showToast(res)
      if (res?.success) {
        Navigate('/login')
      }
    })
    reset();
  };
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
                      <h3 className="text-gray-800 text-3xl font-extrabold">Sign Up</h3>
                      <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign Up to your account and explore a world of possibilities. Your journey begins here.</p>
                    </div>
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">Username</label>
                      <div className="relative flex items-center">
                        <InputField
                          name="fullName"
                          type="text"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                        <HiOutlineMail className="top-1/2  text-gray-400  -translate-y-1/2 absolute right-4" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">Email</label>
                      <div className="relative flex items-center">
                        <InputField
                          name="email"
                          type="email"
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
                          name="password"
                          type="password"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                      </div>
                    </div>
                    <div className="!mt-8">
                      <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary  focus:outline-none">
                        Register
                      </button>
                    </div>
                    <p className="text-sm !mt-8 text-center text-gray-800">Already have an account  <Link to="/login" className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap">Log In</Link></p>
                  </div>
                </div>
                <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
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

export default SignupFrom;
