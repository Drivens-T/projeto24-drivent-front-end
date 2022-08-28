import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useBookTicket() {
  const token = useToken();

  const {
    loading: bookTicketLoading,
    error: bookTicketError,
    act: bookTicket,
  } = useAsync((data) => ticketApi.book(data, token), false);

  return {
    bookTicketLoading,
    bookTicketError,
    bookTicket,
  };
}
