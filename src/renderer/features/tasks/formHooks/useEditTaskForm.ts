import { useForm } from 'react-hook-form';
import EditTaskSchema from '../schema/EditTaskSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useEditTaskForm = () => {
  return useForm({
    resolver: zodResolver(EditTaskSchema),
  });
};

export default useEditTaskForm;
