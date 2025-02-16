import React from 'react';
import { FormProvider } from 'react-hook-form';
import useNewProjectForm from '../formHooks/useNewProjectForm';
import Input from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/Button';

const ProjectForm = () => {
  const methods = useNewProjectForm();

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

export default ProjectForm;
