import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function RoomCard({ number, capacity, vacancies, selected, bookedRoom, onClick }) {
  const vacanciesEl = [];
  let selectedBed = selected ? 1 : 0;
  let bookedBed = bookedRoom ? 1 : 0;
  let filledBed = capacity - vacancies - bookedBed;

  const disabled = vacancies === 0 && !bookedRoom;

  while (vacanciesEl.length < capacity) {
    if (filledBed > 0) {
      filledBed--;
      vacanciesEl.push(<FilledPersonIcon disabled={disabled} />);
    } else if (selectedBed > 0) {
      selectedBed--;
      vacanciesEl.push(<FilledPersonIcon selected />);
    } else vacanciesEl.push(<PersonIcon />);
  }

  vacanciesEl.reverse();

  return (
    <StyledRoomCard selected={selected} onClick={onClick} disabled={disabled}>
      <div>{number}</div>
      <div>{vacanciesEl}</div>
    </StyledRoomCard>
  );
}

export const StyledRoomCard = styled.article`
  width: 190px;
  height: 45px;

  display: flex;
  justify-content: space-between;

  border: 1px solid #cecece;
  border-radius: 10px;

  padding: 11px 16px;

  color: #454545;

  cursor: pointer;

  div {
    display: flex;
  }

  ${({ selected }) => {
    if (selected) {
      return `
      background-color:#FFEED2;
      `;
    }
  }}

  ${({ disabled }) => {
    if (disabled) {
      return `
      color: #9D9D9D;
      background-color:#CECECE;
      pointer-events: none;
      `;
    }
  }}
`;

export const PersonIcon = styled(BsPerson)`
  height: 100%;
  width: 100%;
`;

export const FilledPersonIcon = styled(BsPersonFill)`
  height: 100%;
  width: 100%;

  ${({ disabled }) => {
    if (disabled) {
      return `
      color:#8C8C8C;
      `;
    }
  }}

  ${({ selected }) => {
    if (selected) {
      return `
      color:#FF4791;
      `;
    }
  }}
`;
