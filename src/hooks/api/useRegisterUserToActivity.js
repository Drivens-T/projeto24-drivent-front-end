import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useRegisterUserToActivity() {
  const token = useToken();

  const {
    loading: registerUserToActivityLoading,
    error: registerUserToActivityError,
    act: registerUserToActivity,
  } = useAsync((data) => activitiesApi.register(data, token), false);

  return {
    registerUserToActivityLoading,
    registerUserToActivityError,
    registerUserToActivity,
  };
}
