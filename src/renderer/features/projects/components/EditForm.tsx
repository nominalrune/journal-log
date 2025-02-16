import React from 'react';
import { FormProvider } from 'react-hook-form';
import useEditProjectForm from '../formHooks/useEditProjectForm';
import Input from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/Button';

const EditProjectForm = () => {
  const methods = useEditProjectForm();

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
          label="Description"
          {...methods.register('description')}
          error={methods.formState.errors.description?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default EditProjectForm;
