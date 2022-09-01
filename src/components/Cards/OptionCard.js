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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;

  border: 1px solid #cecece;
  border-radius: 20px;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  cursor: pointer;

  h6 {
    font-size: 16px;
    color: #454545;
  }

  p {
    font-size: 14px;
    color: #898989;
  }

  ${(props) => {
    if (props.backgroundColor) {
      return `background-color:${props.backgroundColor}`;
    }
    if (props.border) {
      return `border: ${props.border}`;
    }
    if (props.selected) {
      return `
      background-color:#FFEED2;
      border: none;
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
