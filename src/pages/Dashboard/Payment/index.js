import { useState } from 'react';
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

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { modalities } = useModalities();
  const [chosenModality, setChosenModality] = useState({});

  const { bookTicket, bookTicketLoading } = useBookTicket();

  // TODO request from the API
  const { accomodationTypes } = [
    { name: 'Sem hotel', price: 0 },
    { name: 'Com hotel', price: 350 },
  ];
  const [chosenAccommodationType, setChosenAccommodationType] = useState({});

  function handleCardClick(card, chosenCard, setChosenCard) {
    if (chosenCard.id !== card.id) setChosenCard(card);
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

    if (!chosenModality.id || !chosenAccommodationType.id) {
      toast('Preencha todos os dados!');
      return;
    }

    try {
      await bookTicket(newData);
      toast('Ingresso reservado com sucesso!');
    } catch (error) {
      toast('Não foi possível reservar um ingresso!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <Message>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Message>
      ) : (
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
          {chosenModality?.name === 'Online' && (
            <StepChoiceContainer>
              <PageInformation>
                Fechado! O total ficou em R$ {calculateTotalPrice()}. Agora é só confirmar:
              </PageInformation>
              <button onClick={handleBookClick} disabled={bookTicketLoading}>
                Reservar ingresso
              </button>
            </StepChoiceContainer>
          )}
        </>
      )}
    </>
  );
}

const StepChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-bottom: 44px;
`;
