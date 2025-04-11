/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:20:19
 * @modify date 2024-10-25 11:20:19
 * @desc User Edit Profile
 */
import useCommonForm from "../../Global/FormHook/FormHook";
import * as Yup from 'yup';
import InputField from "../../Global/FormHook/InputField";
import 'react-phone-input-2/lib/style.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../../libs/ImageUpload";
import ApiClient from "../../Global/Apiclient";
import { ApiResponse } from "../../Global/CommonInterfaces/CommonInterface";
import { useToast } from "../../libs/Toast";
import { login_success } from "../../Redux/Actions/user";
import PhoneInput from "react-phone-input-2";
import { selectUser } from "../../libs/UserStore";
const EditProfileSchema = Yup.object().shape({
  email: Yup.string().required('Please enter email').email('Please Enter a valid Email'),
  fullName: Yup.string().required('Please enter email'),

});
export default function EditProfile({ setEditProfil }: any) {
  const [Image, setImage] = useState('');
  const showToast = useToast()
  const dispatch = useDispatch()
  const { register, handleSubmit, setValue, errors } = useCommonForm(EditProfileSchema);
  const user = useSelector(selectUser);
  const [PhoneNumber, setPhoneNumber] = useState(user?.mobileNo)
  useEffect(() => {
    setImage(user?.image || '')
    setPhoneNumber(user?.mobileNo);
    // @ts-ignore
    setValue('mobileNo', user?.mobileNo)
    // @ts-ignore
    setValue('fullName', user?.fullName)
    // @ts-ignore
    setValue('email', user?.email)
  }, [user])
  const HandleSubmit = (data: any) => {
    const Payload: any = { id: user?.id || user?._id, userId: user?.id || user?._id, fullName: data?.fullName, mobileNo: PhoneNumber, image: Image }
    ApiClient.put<any>(`user/editUserDetails`, Payload).then((res: ApiResponse) => {
      showToast(res);
      if (res.success) {
        dispatch(login_success({ ...user, ...Payload }));
        setEditProfil(false)
      }
    })
  }
  const HandleImageChange = (file: any): void => {
    if (!file) {
      setImage('')
      return
    }
    const formData = new FormData();
    formData.append('file', file);
    ApiClient.postFormData<any>(`upload/image?model=user`, formData).then((res: any) => {
      if (res.success) {
        setImage(res?.filePath);
      }
    })
  }
  return (
    <div>
      <div className="wrapper_section">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-[#111827]">
            Edit Profile
          </h3>
        </div>
        <form name="profileForm" onSubmit={handleSubmit(HandleSubmit)}>
          <div className="grid grid-cols-12 mb-4 gap-4 shadow p-6 mt-6  bg-white rounded-[10px]">
            <div className="col-span-12 md:col-span-6">
              <label className="text-sm mb-2 block">
                Name
                <span className="text-red-600">*</span>
                <InputField
                  name="fullName"
                  type="text"
                  register={register}
                  errors={errors}
                  showLabel={false}
                />
              </label>
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="text-sm mb-2 block">
                Email
                <span className="text-red-600">*</span>
                <InputField
                  name="email"
                  type="email"
                  register={register}
                  disabled={true}
                  errors={errors}
                  showLabel={false}

                />
              </label>

            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="text-sm mb-2 block">
                Mobile No
              </label>
              <PhoneInput
                country={'us'} // Default country code
                inputClass='pl-5'
                inputStyle={{
                  width: '100%',
                  height: '40px',
                  border: '1px solid #d1d5db', // Tailwind's gray-300
                  borderRadius: '0.375rem', // Tailwind's rounded-lg
                  paddingLeft: '41px !important',
                  fontSize: '0.875rem', // Tailwind's text-sm
                  color: '#1f2937', // Tailwind's gray-800
                }}
                value={PhoneNumber}
                onChange={e => setPhoneNumber(e)}
              />
            </div>
            <div className="col-span-12 md:col-span-12">
              <ImageUpload onChange={HandleImageChange} value={Image} label="Upload Image" />
            </div>
          </div>
          <div className="text-right mt-3">
            <button type="button" className="text-white bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3" onClick={() => setEditProfil(false)}>
              Cancel
            </button>
            <button type="submit" className="text-white  bg-[#1e73be] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
