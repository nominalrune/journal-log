import React from 'react';
import { FormProvider } from 'react-hook-form';
import useNewLogForm from '../formHooks/useNewLogForm';
import Input from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/Button';

const LogForm = () => {
  const methods = useNewLogForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          label="User"
          {...methods.register('user')}
          error={methods.formState.errors.user?.message}
        />
        <Input
          label="Task"
          {...methods.register('task')}
          error={methods.formState.errors.task?.message}
        />
        <Input
          label="Date"
          type="date"
          {...methods.register('date')}
          error={methods.formState.errors.date?.message}
        />
        <Input
          label="Time"
          type="time"
          {...methods.register('time')}
          error={methods.formState.errors.time?.message}
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

export default LogForm;
