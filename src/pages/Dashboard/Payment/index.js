import { useState } from 'react';
import styled from 'styled-components';

import useModalities from '../../../hooks/api/useModalities';

import { StyledTypography } from './../../../components/PersonalInformationForm';
import PageInformation from '../../../components/Texts/PageInformation';
import CardsRow from '../../../components/Cards/CardsRow';
import OptionCard from '../../../components/Cards/OptionCard';

export default function Payment() {
  const { modalities } = useModalities();
  const [chosenModality, setChosenModality] = useState({});

  function handleCardClick(card, chosenCard, setChosenCard) {
    if (chosenCard.id !== card.id) setChosenCard(card);
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
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
    </>
  );
}

const StepChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-bottom: 44px;
`;
