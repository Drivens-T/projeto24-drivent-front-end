import styled from 'styled-components';

export default function Message({ children }) {
  return (
    <MessageWrapper>
      <StyledMessage>{children}</StyledMessage>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMessage = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
  max-width: 440px;
`;
