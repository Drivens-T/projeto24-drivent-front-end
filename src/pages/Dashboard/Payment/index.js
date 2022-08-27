import useEnrollment from '../../../hooks/api/useEnrollment';
import { Message } from '../../../components/Message';

export default function Payment() {
  const { enrollment } = useEnrollment();

  return enrollment ? (
    <div>'Pagamento: Em breve!'</div>
  ) : (
    <Message>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Message>
  );
}
