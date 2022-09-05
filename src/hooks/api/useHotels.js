import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi';
import useAsyncRenewObject from '../useAsyncRenewObject';

const initialState = {
  id: 0,
  name: '',
  imageUrl: '',
  roomTypes: [],
  availableVacancies: 0,
  rooms: [
    {
      roomNumber: 0,
      roomType: {
        name: '',
        capacity: 0,
      },
      _count: {
        ticket: 0,
      },
      availableBeds: 0,
    },
  ],
};
export function useHotels() {
  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
  } = useAsync(hotelApi.getAllHotelsInfo, true, [initialState]);

  return {
    hotels,
    hotelsLoading,
    hotelsError,
  };
}

export function useHotel() {
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotelInfo,
  } = useAsyncRenewObject(hotelApi.getHotelInfo, false);

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotelInfo,
  };
}
