import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useBookHotelRoom() {
  const token = useToken();

  const {
    loading: bookHotelRoomLoading,
    error: bookHotelRoomError,
    act: bookHotelRoom,
  } = useAsync((data) => hotelApi.bookRoom(data, token), false);

  return {
    bookHotelRoomLoading,
    bookHotelRoomError,
    bookHotelRoom,
  };
}
