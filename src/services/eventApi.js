import api from './api';

export async function getEventInfo() {
  const response = await api.get('/event');
  return response.data;
}

export async function getEventModalities() {
  const response = await api.get('/event/modalities');
  return response.data;
}
//
