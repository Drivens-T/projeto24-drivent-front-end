import styled from 'styled-components';

export default function OptionCard({ children, large, ...otherProps }) {
  return (
    <>
      {large ? (
        <LargeOptionContainer {...otherProps}>{children}</LargeOptionContainer>
      ) : (
        <SquareOptionContainer {...otherProps}>{children}</SquareOptionContainer>
      )}
    </>
  );
}

const SquareOptionContainer = styled.div`
  width: 145px;
  height: 145px;

  border: 1px solid #cecece;
  border-radius: 20px;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  cursor: pointer;

  ${({ backgroundColor }) => {
    if (backgroundColor) {
      return `background-color:${backgroundColor};`;
    }
  }}

  ${({ border }) => {
    if (border) {
      return `border: ${border};`;
    }
  }}
  
  ${({ selected }) => {
    if (selected) {
      return `
      background-color:#FFEED2;
      border: none;
      `;
    }
  }}
  
  ${({ cardSize }) => {
    if ('medium') {
      return `
      width: 196px;
      height: 100%;
      border-radius: 10px;
      `;
    }
  }}
`;

const LargeOptionContainer = styled(SquareOptionContainer)`
  width: 290px;
  height: 108px;
  background-color: #ffeed2;
  border: none;
  cursor: default;
`;
