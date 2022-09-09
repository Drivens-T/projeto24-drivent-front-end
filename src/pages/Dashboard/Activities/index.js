import { useState } from 'react';
import styled from 'styled-components';

import useTicket from '../../../hooks/api/useTicket';
import useEventLocations from '../../../hooks/api/useLocations';
import useActivities from '../../../hooks/api/useActivities';

import { StyledTypography } from './../../../components/PersonalInformationForm';
import PageInformation from '../../../components/Texts/PageInformation';
import Message from '../../../components/Message';
import ActivitiesBox from '../../../components/ActivitiesContainer';

export default function Activities() {
  const { ticket } = useTicket();
  const { eventLocations } = useEventLocations();
  const { activitiesData } = useActivities();
  const [chosenDay, setChosenDay] = useState('');
  const schedules = [];
  activitiesData?.activities.forEach((activity) => {
    if (activity.isRegister === true) {
      schedules.push(activity);
    }  
  });

  function handleDayClick(date, chosenDay, setChosenDay) {
    if (chosenDay !== date) setChosenDay(date);
  }

  function renderActivitiesStep() {
    return !chosenDay ? (
      <>
        <PageInformation>Primeiro, filtre pelo dia do evento: </PageInformation>
        <Days>
          {activitiesData?.activitiesDate.map((date) => {
            return (
              <StyledDayButton
                selected={date === chosenDay}
                key={date}
                onClick={() => handleDayClick(date, chosenDay, setChosenDay)}
              >
                {date}
              </StyledDayButton>
            );
          })}
        </Days>
      </>
    ) : (
      <>
        <Days>
          {activitiesData?.activitiesDate.map((date) => {
            return (
              <StyledDayButton
                selected={date === chosenDay}
                key={date}
                onClick={() => handleDayClick(date, chosenDay, setChosenDay)}
              >
                {date}
              </StyledDayButton>
            );
          })}
        </Days>
        <Container>
          {eventLocations?.map((location) => {
            return (
              <Content key={location.id}>
                <h5>{location.name}</h5>
                <Box>
                  {activitiesData?.activities.map((activity) => {
                    if (activity?.location.name === location?.name && chosenDay.substring(8).trim() === activity?.startTime.substring(0, 5).trim()) {
                      return (
                        <ActivitiesBox key={activity.id} activity={activity} schedules={schedules} />);
                    }
                  })}
                </Box>
              </Content>
            );
          })}
        </Container>
      </>
    );
  }

  function verifyModality() {
    return (
      <>
        {ticket?.modalityId === 2 ? (
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
      {!ticket?.paid ? (
        <Message>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</Message>
      ) : (
        verifyModality()
      )}
    </>
  );
}

const Days = styled.div`
  width: 444px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const StyledDayButton = styled.button`
  color: #000000;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border: none;
  width: 131px;
  height: 37px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.41px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin-right: 17px;
  cursor: pointer;

  ${(props) => {
    if (props.selected) {
      return `
      background-color:#FFD37D;
      `;
    }
  }}
`;
const Container = styled.div`
  width: 864px;
  height: 392px;
  display: flex;
  margin-top: 50px;
`;

const Content = styled.div`
  width: 288px;
  height: 437px;
  display: flex;
  flex-direction: column;

  h5 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 19.92px;
    text-align: center;
    color: #7b7b7b;
    padding-bottom: 5px;
    margin-top: 20px;
  }
`;

const Box = styled.div`
  width: 288px;
  height: 392px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px #d7d7d7;
`;
