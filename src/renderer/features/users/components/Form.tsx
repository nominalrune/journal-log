import React from 'react';
import { FormProvider } from 'react-hook-form';
import useNewUserForm from '../formHooks/useNewUserForm';
import Input from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/Button';

const UserForm = () => {
  const methods = useNewUserForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          label="Name"
          {...methods.register('name')}
          error={methods.formState.errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          {...methods.register('email')}
          error={methods.formState.errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...methods.register('password')}
          error={methods.formState.errors.password?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default UserForm;
