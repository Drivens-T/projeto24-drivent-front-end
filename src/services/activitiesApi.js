import api from './api';

export async function register(body, token) {
  const response = await api.post('/activities/register', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
