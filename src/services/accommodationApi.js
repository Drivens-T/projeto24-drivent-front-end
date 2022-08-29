import api from './api';

export async function getAccommodationTypes() {
  const response = await api.get('/accommodations');
  return response.data;
}
