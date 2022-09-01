import { useEffect, useState } from 'react';
import OptionCard from '../../../components/Cards/OptionCard';
import Message from '../../../components/Message';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import useAccommodations from '../../../hooks/api/useAccommodations';
import useModalities from '../../../hooks/api/useModalities';

import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = useTicket();
  const { modalities } = useModalities();
  const { accommodationTypes } = useAccommodations();
  const [chosenModality, setChosenModality] = useState({});
  const [chosenAccommodationType, setChosenAccommodationType] = useState({});

  useEffect(() => {
    if (ticket && modalities && accommodationTypes) {
      setChosenModality(modalities.find((modality) => modality.id === ticket.modalityId));
      setChosenAccommodationType(
        accommodationTypes.find((accommodation) => accommodation.id === ticket.accommodationId)
      );
    }
  }, [ticket, modalities, accommodationTypes]);

  function renderNonAuthorizationMessage() {
    if (chosenModality?.name === 'Online' || chosenAccommodationType?.name === 'Sem hotel') {
      return (
        <>
          <Message>
            <p>Sua modalidade de ingresso não inclui hospedagem </p>
            <p>Prossiga para a escolha de atividades</p>
          </Message>
        </>
      );
    }
    if (!ticket || !ticket?.paid) {
      return <Message>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</Message>;
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {renderNonAuthorizationMessage()}
    </>
  );
}
