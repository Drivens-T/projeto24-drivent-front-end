import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import PaymentForm from '../../../components/PaymentForm';

export default function Payment() {
  return (
    <PaymentContainer>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6">Ingresso escolhido</StyledTypography>
      <SelectedBox></SelectedBox>
      <StyledTypography variant="h6">Pagamento</StyledTypography>
      <PaymentForm></PaymentForm>
    </PaymentContainer>
  );
}

const PaymentContainer = styled.div`
  h6 {
    color: #8e8e8e;
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const SelectedBox = styled.div`
  background-color: #ffeed2;
  width: 290px;
  height: 108px;
  border-radius: 20px;
  margin-bottom: 20px;
`;
