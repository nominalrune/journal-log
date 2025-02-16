import { useForm } from 'react-hook-form';
import NewTaskSchema from '../schema/NewTaskSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useNewTaskForm = () => {
  return useForm({
    resolver: zodResolver(NewTaskSchema),
  });
};

export default useNewTaskForm;
