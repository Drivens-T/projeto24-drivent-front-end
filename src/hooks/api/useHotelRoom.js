import * as hotelApi from '../../services/hotelApi';
import useAsyncRenewObject from '../useAsyncRenewObject';
import useToken from '../useToken';

export default function useHotelRoom() {
  const token = useToken();

  const {
    data: bookedRoom,
    loading: bookedRoomLoading,
    error: bookedRoomError,
    act: getBookedRoom,
  } = useAsyncRenewObject(() => hotelApi.getBookedRoomInfo(token));

  return {
    bookedRoom,
    bookedRoomLoading,
    bookedRoomError,
    getBookedRoom,
  };
}
