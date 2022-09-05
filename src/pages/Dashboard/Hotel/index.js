import { useEffect, useState } from 'react';

import styled from 'styled-components';

import CardsRow from '../../../components/Cards/CardsRow';
import OptionCard from '../../../components/Cards/OptionCard';
import Message from '../../../components/Message';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import PageInformation from '../../../components/Texts/PageInformation';
import useAccommodations from '../../../hooks/api/useAccommodations';
import { useHotel, useHotels } from '../../../hooks/api/useHotels';
import useModalities from '../../../hooks/api/useModalities';

import { toast } from 'react-toastify';
import useBookHotelRoom from '../../../hooks/api/useBookRoom';
import useTicket from '../../../hooks/api/useTicket';
import { StepChoiceContainer } from '../Payment';
import useHotelRoom from '../../../hooks/api/useHotelRoom';
import { StyledBookButton } from '../../../components/Buttons/Button';
import RoomCard from '../../../components/Cards/RoomCard';

export default function Hotel() {
  const { ticket } = useTicket();
  const { modalities } = useModalities();
  const { accommodationTypes } = useAccommodations();
  const [chosenModality, setChosenModality] = useState({});
  const [chosenAccommodationType, setChosenAccommodationType] = useState({});

  const { hotels } = useHotels();
  const { hotel, getHotelInfo } = useHotel();
  const { bookHotelRoom, bookHotelRoomLoading } = useBookHotelRoom();
  const { bookedRoom, getBookedRoom } = useHotelRoom();

  const [chosenHotelId, setChosenHotelId] = useState(0);
  const [chosenRoomId, setChosenRoomId] = useState();
  const [changeRoom, setChangeRoom] = useState(false);

  useEffect(() => {
    if (ticket && modalities && accommodationTypes) {
      setChosenModality(modalities.find((modality) => modality.id === ticket.modalityId));
      setChosenAccommodationType(
        accommodationTypes.find((accommodation) => accommodation.id === ticket.accommodationId)
      );
    }
  }, [ticket, modalities, accommodationTypes]);

  function handleHotelClick(hotelId) {
    setChosenHotelId(hotelId);
  }

  function handleRoomClick(roomId) {
    setChosenRoomId(roomId);
  }

  async function handleBookHotelRoom() {
    if (chosenRoomId === bookedRoom?.id) {
      toast('Quarto reservado com sucesso!');
      getBookedRoom();
      setChangeRoom(false);
    } else {
      try {
        await bookHotelRoom({ roomId: chosenRoomId });
        toast('Quarto reservado com sucesso!');
        getBookedRoom();
        setChangeRoom(false);
      } catch (error) {
        toast('Não foi possível reservar um quarto!');
        getHotelInfo(chosenHotelId);
      }
    }
  }

  function handleChangeRoomClick() {
    setChosenHotelId(bookedRoom.hotel.id);
    setChosenRoomId(bookedRoom.id);
    getHotelInfo(chosenHotelId);
    setChangeRoom(true);
  }

  useEffect(() => {
    if (chosenHotelId) getHotelInfo(chosenHotelId);
    if (bookedRoom?.hotel.id !== chosenHotelId || hotel?.rooms.find((room) => room.id === chosenRoomId)) {
      setChosenRoomId(0);
    } else if (bookedRoom?.hotel.id === chosenHotelId) {
      setChosenRoomId(bookedRoom.id);
    }
  }, [chosenHotelId]);

  function hasTicketBeenPaid() {
    return ticket || ticket?.paid;
  }

  function isModalityWithHotel() {
    return chosenModality?.name !== 'Online' && chosenAccommodationType?.name !== 'Sem hotel';
  }

  function isHotelAndRoomChosen() {
    return chosenHotelId !== 0 && chosenRoomId !== 0;
  }

  function renderNonAuthorizationMessage() {
    if (!hasTicketBeenPaid()) {
      return <Message>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</Message>;
    }
    if (!isModalityWithHotel()) {
      return (
        <>
          <Message>
            <p>Sua modalidade de ingresso não inclui hospedagem </p>
            <p>Prossiga para a escolha de atividades</p>
          </Message>
        </>
      );
    }
  }

  function renderHotels() {
    if (hasTicketBeenPaid() && isModalityWithHotel() && hotels) {
      return (
        <CardsRow>
          {hotels.map((hotel) => {
            return (
              <OptionCard
                key={hotel.id}
                backgroundColor="#F1F1F1"
                border="none"
                onClick={() => handleHotelClick(hotel.id)}
                selected={hotel.id === chosenHotelId}
                cardSize="medium"
              >
                <StyleWrapper>
                  <img src={hotel.imageUrl} alt={hotel.name} />
                  <h6>{hotel.name}</h6>
                  <div>
                    <p>Tipos de acomodação:</p>
                    <p>
                      {hotel.roomTypes.reduce((acc, roomType, index) => {
                        if (index === 0) return roomType;
                        if (index === hotel.roomTypes.length - 1) return acc + ' e ' + roomType;
                        return acc + ', ' + roomType;
                      }, '')}
                    </p>
                  </div>
                  <div>
                    <p>Vagas disponíveis:</p>
                    <p>{hotel.availableVacancies}</p>
                  </div>
                </StyleWrapper>
              </OptionCard>
            );
          })}
        </CardsRow>
      );
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {renderNonAuthorizationMessage()}
      {bookedRoom && !changeRoom ? (
        <>
          <StepChoiceContainer>
            <PageInformation>Você já escolheu seu quarto:</PageInformation>
            <CardsRow>
              <OptionCard key={bookedRoom.id} backgroundColor="#FFEED2" border="none" cardSize="medium">
                <StyleWrapper>
                  <img src={bookedRoom.hotel.imageUrl} alt={bookedRoom.hotel.name} />
                  <h6>{bookedRoom.hotel.name}</h6>
                  <div>
                    <p>Quarto reservado:</p>
                    <p>
                      {bookedRoom.roomNumber} ({bookedRoom.roomType.name})
                    </p>
                  </div>
                  <div>
                    <p>Pessoas no seu quarto:</p>
                    <p>Você{bookedRoom._count.ticket > 1 && ` e mais ${bookedRoom._count.ticket - 1}`}</p>
                  </div>
                </StyleWrapper>
              </OptionCard>
            </CardsRow>
          </StepChoiceContainer>
          <StepChoiceContainer>
            <StyledBookButton onClick={handleChangeRoomClick}>Trocar de quarto</StyledBookButton>
          </StepChoiceContainer>
        </>
      ) : (
        <>
          <StepChoiceContainer>{renderHotels()}</StepChoiceContainer>
          {hotel && (
            <>
              <StepChoiceContainer>
                <PageInformation>Ótima pedida! Agora escolha seu quarto</PageInformation>
                <CardsRow>
                  {hotel?.rooms?.map((room) => {
                    return (
                      <RoomCard
                        key={room.id}
                        onClick={() => handleRoomClick(room.id)}
                        number={room.roomNumber}
                        vacancies={room.availableBeds}
                        capacity={room.roomType.capacity}
                        bookedRoom={bookedRoom?.id === room.id}
                        selected={room.id === chosenRoomId}
                      ></RoomCard>
                    );
                  })}
                </CardsRow>
              </StepChoiceContainer>
              <StepChoiceContainer>
                {isHotelAndRoomChosen() && (
                  <StyledBookButton onClick={handleBookHotelRoom} disabled={bookHotelRoomLoading}>
                    Reservar Quarto
                  </StyledBookButton>
                )}
              </StepChoiceContainer>
            </>
          )}
        </>
      )}
    </>
  );
}

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;
  padding: 16px 14px;

  img {
    width: 100%;
    height: 109px;
    object-fit: cover;
    border-radius: 5px;
  }

  h6 {
    font-size: 20px;
    color: #343434;
  }

  p {
    font-size: 14px;
    color: #898989;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 3px;

    color: #3c3c3c;

    margin-bottom: 4px;

    & > p:first-of-type {
      font-weight: 700;
    }

    & > p {
      font-size: 12px;
    }
  }
`;
