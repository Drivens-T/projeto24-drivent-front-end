import api from './api';

export async function getAllHotelsInfo() {
  const response = await api.get('/hotels');
  return response.data;
}

export async function getHotelInfo(hotelId) {
  const response = await api.get('/hotels/hotel/' + hotelId);
  return response.data;
}

export async function bookRoom(body, token) {
  const response = await api.post('/hotels/book', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getBookedRoomInfo(token) {
  const response = await api.get('/hotels/room', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
