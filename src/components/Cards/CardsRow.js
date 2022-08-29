import styled from 'styled-components';

export default function CardsRow({ children }) {
  return (
    <>
      <StyledCardsRow>{children}</StyledCardsRow>
    </>
  );
}

const StyledCardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;
