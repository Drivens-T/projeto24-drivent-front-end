import api from './api';

export async function book(body, token) {
  const response = await api.post('/ticket/book', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTicketInfo(token) {
  const response = await api.get('/ticket', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
//
