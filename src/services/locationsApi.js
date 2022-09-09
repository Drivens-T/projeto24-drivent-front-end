import api from './api';

export async function getEventLocations() {
  const response = await api.get('/locations');
  return response.data;
}
