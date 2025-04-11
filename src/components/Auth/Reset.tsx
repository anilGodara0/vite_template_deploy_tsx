/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:18:58
 * @modify date 2024-10-25 11:18:58
 * @desc Reset Password Screen
 */
import * as Yup from 'yup';
import useCommonForm from '../../Global/FormHook/FormHook';
import InputField from '../../Global/FormHook/InputField';
import ApiClient from '../../Global/Apiclient';
import { ApiResponse } from '../../Global/CommonInterfaces/CommonInterface';
import { helper } from '../../libs/HelperPipe';
import { useToast } from '../../libs/Toast';
import useCustomNavigate from '../../libs/useCustomNaviagte';
const resetSchema = Yup.object().shape({
  otp: Yup.string().required('Otp is required').max(8, 'Otp is invalid').min(4, 'Otp is invalid'),
  password: Yup.string()
    .required('Please enter a password')
    .min(8, 'Please enter at least eight characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please enter your confirm password'),
});

const ResetForm = () => {
  const showToast = useToast()
  const { register, handleSubmit, errors, reset } = useCommonForm(resetSchema);
  const navigate = useCustomNavigate();
  const resetPassword = async (otp: string, password: string) => {
    try {
      const email = helper.UrlParamGet('email');
      const loginRes: ApiResponse = await ApiClient.post('user/verify-otp', { otp, email });

      if (loginRes.success) {

        const updateRes: ApiResponse = await ApiClient.put('user/reset/user-password', {
          id: loginRes.data?.id,
          password,
        });

        showToast(updateRes);
        if (updateRes.success) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };

  const handleFormSubmit = (data: any) => {
    resetPassword(data.otp, data.password);
    reset();
  };

  return (
    <form className='bg_images' onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-md">
            <div className="space-y-4">
              <div className="mb-8">
                <img src='/img/logo.png' alt='logo' className='mb-4 h-20' />
                <h3 className="text-gray-800 text-3xl font-extrabold">New Password</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Please enter a new password for your account.
                </p>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">OTP</label>
                <div className="relative flex items-center">
                  <InputField
                    name="otp"
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
                    name="password"
                    type="password"
                    register={register}
                    errors={errors}
                    showLabel={false}
                  />

                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <div className="relative flex items-center">
                  <InputField
                    name="confirmPassword"
                    type="password"
                    register={register}
                    errors={errors}
                    showLabel={false}
                  />
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="img/login-3.png"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetForm;
