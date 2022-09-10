import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BiLogIn } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import useRegisterUserToActivity from '../hooks/api/useRegisterUserToActivity';

export default function ActivitiesBox(props) {
  const { activity, schedules } = props;
  const { name, startTime, endTime, capacity, isRegister, id } = activity;
  const [register, setRegister] = useState(isRegister);

  const { registerUserToActivity, registerUserToActivityLoading } = useRegisterUserToActivity();

  const start = startTime.substring(11, 16);
  const end = endTime.substring(11, 16);
  const duration = calculateActivityDuration(startTime, endTime);
  let conflict = checkTimeConflict(schedules, startTime, endTime);

  function checkTimeConflict(schedules, start, end) {
    let conflict = false;
    schedules.forEach((schedule) => {
      const scheduleDate = schedule.startTime.substring(0, 5);
      const activityDate = start.substring(0, 5);
      const startValue = parseInt(start.substring(11, 13));
      const endValue = parseInt(end.substring(11, 13));
      const scheduleStart = parseInt(schedule.startTime.substring(11, 13));
      const scheduleEnd = parseInt(schedule.endTime.substring(11, 13));
      if (
        (startValue >= scheduleStart && startValue < scheduleEnd && scheduleDate === activityDate) ||
        (endValue > scheduleStart && endValue <= scheduleEnd && scheduleDate === activityDate)
      ) {
        conflict = true;
      }
    });
    return conflict;
  }

  async function handleRegisterClick() {
    const newData = {
      id,
    };
    if (conflict === true) {
      toast('Você já se inscreveu em uma atividade nesse horário!');
      return;
    }
    try {
      await registerUserToActivity(newData);
      setRegister(true);
      toast('Inscrito na atividade com sucesso!');
    } catch (error) {
      toast('Falha ao se inscrever na atividade!');
    }
  }

  function calculateActivityDuration(startTime, endTime) {
    const start = parseInt(startTime.substring(11, 13));
    const end = parseInt(endTime.substring(11, 13));
    const duration = end - start;
    return duration;
  }

  function renderAvaliableActivity() {
    return !register ? (
      <Events duration={duration}>
        <MinorDiv duration={duration}>
          <h1>{name}</h1>
          <p>
            {start} - {end}
          </p>
        </MinorDiv>
        <Bar duration={duration} />
        <Enroll onClick={handleRegisterClick} disabled={registerUserToActivityLoading} />
        <Vacancies>{capacity} vagas</Vacancies>
      </Events>
    ) : (
      <Events duration={duration} register={register}>
        <MinorDiv duration={duration} register={register}>
          <h1>{name}</h1>
          <p>
            {start} - {end}
          </p>
        </MinorDiv>
        <Bar duration={duration} register={register} />
        <Check />
        <Vacancies>Inscrito</Vacancies>
      </Events>
    );
  }

  return capacity === 0 && isRegister === false ? (
    <Events duration={duration}>
      <MinorDiv duration={duration}>
        <h1>{name}</h1>
        <p>
          {start} - {end}
        </p>
      </MinorDiv>
      <Bar duration={duration} />
      <Sold />
      <NoVacancies>Esgotado</NoVacancies>
    </Events>
  ) : (
    renderAvaliableActivity()
  );
}

export const Events = styled.div`
  width: 265px;
  display: flex;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;

  ${(props) => `height: ${props.duration * 80}px;`};
  ${(props) => {
    if (props.register === true) {
      return `
      background-color:#D0FFDB;
      `;
    } else {
      return `
      background-color:#f1f1f1;
      `;
    }
  }}
`;

export const MinorDiv = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 12px 10px;

  ${(props) => `height: ${props.duration * 55}px;`};
  ${(props) => {
    if (props.register === true) {
      return `
      background-color:#D0FFDB;
      `;
    } else {
      return `
      background-color:#f1f1f1;
      `;
    }
  }}

  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 14.06px;
    color: #343434;
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 14.06px;
    color: #343434;
  }
`;

export const Bar = styled.div`
  width: 1px;
  position: absolute;
  top: 10px;
  right: 60px;

  ${(props) => `height: ${props.duration * 60}px;`};
  ${(props) => {
    if (props.register === true) {
      return `
      background-color:#99E8A1;
      `;
    } else {
      return `
      background-color:#cfcfcf;
      `;
    }
  }}
`;

const Enroll = styled(BiLogIn)`
  position: absolute;
  top: 20px;
  right: 22px;
  color: #078632;
  font-size: 20px;
  cursor: pointer;
`;

const Vacancies = styled.h2`
  position: absolute;
  top: 44px;
  right: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 9px;
  line-height: 10.55px;
  color: #078632;
`;

const Sold = styled(AiOutlineCloseCircle)`
  position: absolute;
  top: 20px;
  right: 18px;
  color: #cc6666;
  font-size: 20px;
`;

const NoVacancies = styled.h2`
  position: absolute;
  top: 45px;
  right: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 9px;
  line-height: 10.55px;
  color: #cc6666;
`;

const Check = styled(AiOutlineCheckCircle)`
  position: absolute;
  top: 20px;
  right: 17px;
  color: #078632;
  font-size: 20px;
`;
