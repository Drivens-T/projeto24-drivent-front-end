import styled from 'styled-components';

export default function PageInformation({ children }) {
  return (
    <>
      <StyledPageInformation>{children}</StyledPageInformation>
    </>
  );
}

const StyledPageInformation = styled.h5`
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  color: #8e8e8e;
  margin-top: 36px;
`;
