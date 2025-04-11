/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:18:21
 * @modify date 2024-10-25 11:18:21
 * @desc This Page is Created for Forgot Password
 */

import * as Yup from 'yup';
import useCommonForm from '../../Global/FormHook/FormHook';
import InputField from '../../Global/FormHook/InputField';
import { Link } from 'react-router-dom';
import ApiClient from '../../Global/Apiclient';
import { ApiResponse } from '../../Global/CommonInterfaces/CommonInterface';
import { useToast } from '../../libs/Toast';
import useCustomNavigate from '../../libs/useCustomNaviagte';


// Define validation schema for the  form
const forgotSchema = Yup.object().shape({
  email: Yup.string().required('Please enter email').email('Please Enter a valid Email')
});

const ForgotForm = () => {
  const showToast = useToast()
  const { register, handleSubmit, errors, reset } = useCommonForm(forgotSchema);
  const Navigate = useCustomNavigate();
  const handleFormSubmit = (data: any) => {
    ApiClient.post<any>(`user/forgot/password`, data).then((res: ApiResponse) => {
      showToast(res);
      if (res.success) {
        //@ts-ignore
        Navigate(`/reset-password?email=${data?.email}`)
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
                      <h3 className="text-gray-800 text-3xl font-extrabold">Forgot Password                      </h3>
                      <p className="text-gray-500 text-sm mt-4 leading-relaxed">No worries! Just enter your email and we’ll send you a reset password link.

                      </p>
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







                    <div className="!mt-8">
                      <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary  focus:outline-none">
                        Submit
                      </button>
                    </div>

                    <p className="text-sm !mt-8 text-center text-gray-800">Just Remember?<Link to="/login" className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap">Sign In</Link></p>
                  </div>
                </div>
                <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
                  <img src="img/login-1.png" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Login VITE" />
                </div>
              </div>
            </div>
          </div>
        </div>






      </form>
    </>
  );
};

export default ForgotForm;
