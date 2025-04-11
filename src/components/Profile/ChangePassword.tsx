/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:20:04
 * @modify date 2024-10-25 11:20:04
 * @desc User Change Password Screen
 */
import * as Yup from 'yup';
import InputField from '../../Global/FormHook/InputField'
import useCommonForm from '../../Global/FormHook/FormHook';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions/user';
import useCustomNavigate from '../../libs/useCustomNaviagte';
import ApiClient from '../../Global/Apiclient';
import { ApiResponse } from '../../Global/CommonInterfaces/CommonInterface';
import { useToast } from '../../libs/Toast';
const signupSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Please enter your current password')
    .min(8, 'Please enter at least eight characters'),
  newPassword: Yup.string()
    .required('Please enter your new password')
    .min(8, 'Please enter at least eight characters'),
  cnewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Confirm Password must match')
    .required('Please enter your confirm new password'),
});
function ChangePassword() {
  const dispatch = useDispatch()
  const showToast = useToast()
  const navigate = useCustomNavigate()
  const { register, errors, reset, handleSubmit } = useCommonForm(signupSchema);
  const HandleSubmit = (data: any) => {
    ApiClient.put<any>(`user/change/password`, data).then((res: ApiResponse) => {
      showToast(res)
      if (res.success) {
        dispatch(logout());
        navigate('/login');
        Cookies.remove('token');
      }
    })
    reset()
  }
  return (
    <div>
      <form onSubmit={handleSubmit(HandleSubmit)}>
        <div className="wrapper_section">
          <div className="main-title mb-4 ">
            <h3 className="text-lg lg:text-2xl font-semibold text-[#111827] mb-6">
              Change Password
            </h3>
          </div>
          <div className=" grid grid-cols-12">
            <div className="col-span-12  xl:col-span-12 input_form p-6 shadow-box overflow-hidden rounded-lg bg-white">
              <div className="items-center ">
                <div className="">
                  <div className="flex flex-col lg:flex-row  lg:items-center items-start gap-4 mb-6">
                    <label className="text-typo text-base font-medium w-96">
                      Current Password
                      <span className="start">*</span>
                    </label>
                    <div className="w-full">
                      <div className="relative ">
                        <InputField
                          name="currentPassword"
                          type="password"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row  lg:items-center items-start gap-4 mb-6">
                    <label className="text-typo text-base font-medium w-96">
                      New Password
                      <span className="start">*</span>
                    </label>
                    <div className="w-full">
                      <div className="relative ">
                        <InputField
                          name="newPassword"
                          type="password"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row  lg:items-center items-start gap-4 mb-6">
                    <label className="text-typo text-base font-medium w-96">
                      Confirm New Password
                      <span className="start">*</span>
                    </label>
                    <div className="w-full">
                      <div className="relative ">
                        <InputField
                          name="cnewPassword"
                          type="password"
                          register={register}
                          errors={errors}
                          showLabel={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      type="submit"
                      className="text-white bg-[#1e73be] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  mb-2 cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default ChangePassword
