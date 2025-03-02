import useForm from '../../common/hooks/useForm';
import { EditLogSchema } from '../schema/EditLogSchema';
import Log from '../models/Log';
const useEditLogForm = (log: Log) => {
  return useForm(EditLogSchema, log.update, log);
};

export default useEditLogForm;
