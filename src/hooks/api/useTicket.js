import useAsync from '../useAsync';

import * as ticketApi from '../../services/ticketApi';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicketInfo(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket,
  };
}
