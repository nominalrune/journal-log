import { useForm } from 'react-hook-form';
import NewUserSchema from '../schema/NewUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useNewUserForm = () => {
  return useForm({
    resolver: zodResolver(NewUserSchema),
  });
};

export default useNewUserForm;
