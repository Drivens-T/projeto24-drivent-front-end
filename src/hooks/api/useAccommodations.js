import useAsync from '../useAsync';

import * as accommodationApi from '../../services/accommodationApi';

export default function useAccommodations() {
  const {
    data: accommodationTypes,
    loading: accommodationTypesLoading,
    error: accommodationTypesError,
    act: getAccommodationTypes,
  } = useAsync(accommodationApi.getAccommodationTypes);

  return {
    accommodationTypes,
    accommodationTypesLoading,
    accommodationTypesError,
    getAccommodationTypes,
  };
}
