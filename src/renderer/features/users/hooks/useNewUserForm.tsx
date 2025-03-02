import useForm from '../../common/hooks/useForm';
import { NewUserSchema, NewUserType } from '../schema/NewUserSchema';
import User from '../models/User';
import { Input } from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/buttons/Button';
const useNewUserForm = (user?: NewUserType) => {
  const { Form } = useForm(NewUserSchema, User.create, user);
  const UserForm = () => <Form
    render={(methods) => <>
      <Input {...methods.register('name')} label='Name' error={methods.formState.errors.name?.message?.toString()} />
      <Input {...methods.register('email')} label='Email' error={methods.formState.errors.email?.message?.toString()} />
      <Input {...methods.register('password')} type='password' label='Password' error={methods.formState.errors.password?.message?.toString()} />
      <Button className="self-end" type='submit'>Submit</Button>
    </>}
  />;
  return { Form: UserForm };
};

export default useNewUserForm;
