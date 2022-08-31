import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import useBookTicket from '../../../hooks/api/useBookTicket';

import { StyledTypography } from './../../../components/PersonalInformationForm';
import Message from '../../../components/Message';

export default function Activities() {
  const { bookTicket } = useBookTicket();

  function renderActivitiesStep() {
    <h1>Tudo Ok</h1>;
  }

  function verifyModality() {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        {bookTicket.modalityId === 1 ? (
          <Message>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
          </Message>
        ) : (
          renderActivitiesStep()
        )}
      </>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {!bookTicket.paid ? (
        <Message>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</Message>
      ) : (
        verifyModality()
      )}
    </>
  );
}
