/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:35:00
 * @modify date 2024-10-25 11:35:00
 * @desc For created using react-hook-form
 */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useCommonForm = (validationSchema: any = null, defaultValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log(data)
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue
  };
};

export default useCommonForm;
