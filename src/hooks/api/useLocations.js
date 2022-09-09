import useAsync from '../useAsync';

import * as locationsApi from '../../services/locationsApi';

export default function useEventLocations() {
  const {
    data: eventLocations,
    loading: eventLocationsLoading,
    error: eventLocationsError,
    act: getEventLocations,
  } = useAsync(locationsApi.getEventLocations);

  return {
    eventLocations,
    eventLocationsLoading,
    eventLocationsError,
    getEventLocations,
  };
}
