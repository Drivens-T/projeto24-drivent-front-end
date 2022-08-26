import { useState } from 'react';
import styled from 'styled-components';
import { StyledTypography } from './../../../components/PersonalInformationForm';

export default function Payment() {
  const cardsExample = [{
    title: 'Presencial',
    price: 150
  },
  {
    title: 'Online',
    price: 300
  }
  ];

  return (<>
    <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
    <StepChoiceContainer>
      <PageInformation>Primeiro, escolha sua modalidade de ingresso</PageInformation>
      <CardsRow cards={cardsExample}></CardsRow>
    </StepChoiceContainer>
  </>);
}

function PageInformation({ children }) {
  return (<>
    <StyledPageInformation>{children}</StyledPageInformation>
  </>);
}

function CardsRow({ cards }) {
  const [chosenCard, setChosenCard] = useState('');

  function handleCardClick(cardTitle) {
    setChosenCard({ ...chosenCard, title: cardTitle });
  }

  return (<>
    <StyledCardsRow>
      {cards.map((card) => {
        return (
          <OptionCard selected={card.title === chosenCard} key={card.title} onClick={() => handleCardClick(card.title)}>
            <h6>{card.title}</h6>
            <p>{card.price}</p>
          </OptionCard>
        );
      })}
    </StyledCardsRow>
  </>);
}

function OptionCard({ children, ...otherProps }) {
  return (<>
    <SquareOptionContainer {...otherProps}>
      {children}
    </SquareOptionContainer>
  </>);
}

const StepChoiceContainer = styled.div`
 display: flex;
 flex-direction: column;
 gap: 17px;
`;

const StyledPageInformation = styled.h5`
font-size: 20px;
font-family: 'Roboto', sans-serif;
color: #8E8E8E;
`;

const StyledCardsRow = styled.div`
display:flex;
flex-wrap: wrap;
gap: 24px;
`;

const SquareOptionContainer = styled.div`
width: 145px;
height: 145px;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 3px;

border: 1px solid #CECECE;
border-radius: 20px;

font-family: 'Roboto', sans-serif;
font-weight: 400;

cursor: pointer;

h6{
  font-size: 16px;
  color: #454545;
}

p{
  font-size: 14px;
  color: #898989;
}
`;
