import styled from 'styled-components';
import PaymentForm from '../../../components/PaymentForm';
import { OptionCard, PageInformation } from '.';
import { FaCheckCircle as CheckIcon } from 'react-icons/fa';

export default function CardPayment({ creditCardInfo, setCreditCardInfo }) {
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
      {creditCardInfo === null ? (
        <PaymentForm setCreditCardInfo={setCreditCardInfo}></PaymentForm>
      ) : (
        <PaymentConfirmation>
          <CheckIcon fontSize="45px" color="#36B853" />
          <TextContainer>
            <h1>Pagamento confirmado!</h1>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </TextContainer>
        </PaymentConfirmation>
      )}
    </>
  );
}

const PaymentConfirmation = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  h1 {
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    font-weight: 400;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;
