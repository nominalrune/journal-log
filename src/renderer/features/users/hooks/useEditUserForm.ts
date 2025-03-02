import useForm from '../../common/hooks/useForm';
import { EditUserSchema } from '../schema/EditUserSchema';
import User from '../models/User';
const useEditUserForm = (user: User) => {
  return useForm(EditUserSchema, user.update, user);
};

export default useEditUserForm;
