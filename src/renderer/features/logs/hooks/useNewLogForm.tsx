import useForm from '../../common/hooks/useForm';
import { NewLogSchema, NewLogType } from '../schema/NewLogSchema';
import Log from '../models/Log';
const useNewLogForm = (log: NewLogType) => {
  return useForm(NewLogSchema, Log.create, log);
};

export default useNewLogForm;
