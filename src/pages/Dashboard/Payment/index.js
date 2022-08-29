import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useModalities from '../../../hooks/api/useModalities';
import useEnrollment from '../../../hooks/api/useEnrollment';

import { StyledTypography } from './../../../components/PersonalInformationForm';
import PageInformation from '../../../components/Texts/PageInformation';
import CardsRow from '../../../components/Cards/CardsRow';
import OptionCard from '../../../components/Cards/OptionCard';
import Message from '../../../components/Message';
import useBookTicket from '../../../hooks/api/useBookTicket';
import { toast } from 'react-toastify';
import useAccommodations from '../../../hooks/api/useAccommodations';
import useTicket from '../../../hooks/api/useTicket';
import { StyledBookButton } from '../../../components/Buttons/Button';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  const { modalities } = useModalities();

  const { accommodationTypes } = useAccommodations();

  const [chosenModality, setChosenModality] = useState({});
  const [chosenAccommodationType, setChosenAccommodationType] = useState({});
  const [paid, setPaid] = useState(false);

  const { bookTicket, bookTicketLoading } = useBookTicket();

  useEffect(() => {
    if (ticket && modalities && accommodationTypes) {
      setPaid(ticket?.paid);
      setChosenModality(modalities.find((modality) => modality.id === ticket.modalityId));
      setChosenAccommodationType(
        accommodationTypes.find((accommodation) => accommodation.id === ticket.accommodationId)
      );
    }
  }, [ticket, modalities, accommodationTypes]);

  function handleCardClick(card, chosenCard, setChosenCard) {
    if (card.name === 'Online') setChosenAccommodationType({});
    if (chosenCard?.id !== card?.id) setChosenCard(card);
  }

  function calculateTotalPrice() {
    const totalPrice = (chosenModality.price || 0) + (chosenAccommodationType?.price || 0);

    return totalPrice;
  }

  async function handleBookClick() {
    const newData = {
      modalityId: chosenModality.id,
      accommodationId: chosenAccommodationType.id,
    };

    if (chosenModality.name !== 'Online' && (!chosenModality.id || !chosenAccommodationType.id)) {
      toast('Preencha todos os dados!');
      return;
    }

    try {
      await bookTicket(newData);
      setPaid(true);
      toast('Ingresso reservado com sucesso!');
    } catch (error) {
      toast('Não foi possível reservar um ingresso!');
    }
  }

  function renderAccommodationChoice() {
    if (accommodationTypes && chosenModality?.name && chosenModality?.name !== 'Online') {
      return (
        <StepChoiceContainer>
          <PageInformation>Ótimo! Agora escolha sua modalidade de hospedagem</PageInformation>
          <CardsRow>
            {accommodationTypes.map((accommodationType) => {
              return (
                <OptionCard
                  selected={accommodationType.id === chosenAccommodationType?.id}
                  key={accommodationType.id}
                  onClick={() =>
                    handleCardClick(accommodationType, chosenAccommodationType, setChosenAccommodationType)
                  }
                >
                  <h6>{accommodationType.name}</h6>
                  <p>R$ {accommodationType.price}</p>
                </OptionCard>
              );
            })}
          </CardsRow>
        </StepChoiceContainer>
      );
    }
  }

  function renderOrderSummary() {
    if (chosenModality?.name === 'Online' || (chosenModality?.name && chosenAccommodationType?.name)) {
      return (
        <StepChoiceContainer>
          <PageInformation>Fechado! O total ficou em R$ {calculateTotalPrice()}. Agora é só confirmar:</PageInformation>
          <StyledBookButton onClick={handleBookClick} disabled={bookTicketLoading}>
            Reservar ingresso
          </StyledBookButton>
        </StepChoiceContainer>
      );
    }
  }

  function renderPaymentStep() {
    if (!paid) {
      return (
        <>
          <StepChoiceContainer>
            <PageInformation>Primeiro, escolha sua modalidade de ingresso</PageInformation>
            <CardsRow>
              {modalities &&
                modalities.map((modality) => {
                  return (
                    <OptionCard
                      selected={modality.id === chosenModality.id}
                      key={modality.id}
                      onClick={() => handleCardClick(modality, chosenModality, setChosenModality)}
                    >
                      <h6>{modality.name}</h6>
                      <p>R$ {modality.price}</p>
                    </OptionCard>
                  );
                })}
            </CardsRow>
          </StepChoiceContainer>
          {renderAccommodationChoice()}
          {renderOrderSummary()}
        </>
      );
    }
    return <>Já reservou</>;
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <Message>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Message>
      ) : (
        renderPaymentStep()
      )}
    </>
  );
}

const StepChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-bottom: 44px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
