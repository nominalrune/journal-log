import { useForm } from 'react-hook-form';
import EditUserSchema from '../schema/EditUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useEditUserForm = () => {
  return useForm({
    resolver: zodResolver(EditUserSchema),
  });
};

export default useEditUserForm;
