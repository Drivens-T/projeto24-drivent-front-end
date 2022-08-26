import PaymentForm from '../../../components/PaymentForm';
import { OptionCard, PageInformation } from '.';

export default function CardPayment({ setCreditCardInfo }) {
  const card = {
    title: 'Presencial + Com Hotel',
    price: 'R$ 600',
  };

  return (
    <>
      <PageInformation>Ingresso escolhido</PageInformation>
      <OptionCard large>
        <h6>{card.title}</h6>
        <p>{card.price}</p>
      </OptionCard>
      <PageInformation>Pagamento</PageInformation>
      <PaymentForm setCreditCardInfo={setCreditCardInfo}></PaymentForm>
    </>
  );
}
