import useAsync from '../useAsync';

import * as eventApi from '../../services/eventApi';

export default function useModalities() {
  const {
    data: modalities,
    loading: modalitiesLoading,
    error: modalitiesError,
    act: getModalities,
  } = useAsync(() => eventApi.getEventModalities());

  return {
    modalities,
    modalitiesLoading,
    modalitiesError,
    getModalities,
  };
}
