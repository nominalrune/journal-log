import React from 'react';
import { FormProvider } from 'react-hook-form';
import useNewTaskForm from '../hooks/useNewTaskForm';
import Input from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/buttons/Button';

const TaskForm = () => {
  const methods = useNewTaskForm();

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
        <Input
          label="Due Date"
          type="date"
          {...methods.register('due_date')}
          error={methods.formState.errors.due_date?.message}
        />
        <Input
          label="Status"
          type="select"
          {...methods.register('status')}
          error={methods.formState.errors.status?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default TaskForm;
