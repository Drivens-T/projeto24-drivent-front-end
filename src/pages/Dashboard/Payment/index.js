import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';

export default function Payment() {
  const { enrollment } = useEnrollment();

  return enrollment ? (
    <div>'Pagamento: Em breve!'</div>
  ) : (
    <Message>
      <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
    </Message>
  );
}

const Message = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  margin: auto;
  color: #8e8e8e;
`;
