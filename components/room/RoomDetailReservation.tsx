import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import DatePicker from "../common/DatePicker";
import Counter from "../common/Counter";
import palette from "../../styles/palette";
import Button from "../common/button/Button";

const Container = styled.div`
  padding: 24px 24px 16px;
  width: 362px;
  height: fit-content;
  background-color: white;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;

  .room-detail-reservation-info {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .room-detail-reservation-inputs {
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid ${palette.gray_71};
    border-radius: 8px;

    .room-detail-reservation-date-inputs {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      border-bottom: 1px solid ${palette.gray_71};

      .room-detail-reservation-check-in {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px 0 0 0;
        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 8px 0 0 0;
          cursor: pointer;
          border-right: 1px solid ${palette.gray_71};
          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
      .room-detail-reservation-check-out {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        right: 0;
        border-radius: 8px 0 0 0;
        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 0 8px 0 0;
          cursor: pointer;
          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
    }
    .room-detail-reservation-guests-count-wrapper {
      position: relative;
      .room-detail-reservation-guests-count {
        width: 100%;
        height: 56px;
        border-radius: 0 0 8px 8px;
        padding: 10px 12px;
        cursor: pointer;
        span {
          display: block;
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 7px;
        }
        p {
          font-size: 14px;
          color: ${palette.gray_71};
        }
      }
      .room-detail-reservation-guests-popup {
        position: absolute;
        width: 100%;
        top: 58px;
        left: 0;
        padding: 16px;
        background-color: white;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
        cursor: default;
      }
      .mb-24 {
        margin-bottom: 24px;
      }
    }
  }
`;

const RoomDetailReservation: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const [guestCountPopupOpened, setGuestCountPopupOpened] = useState(false);

  return (
    <Container>
      <p className="room-detail-reservation-info">
        요금을 확인하려면 날짜를 입력하세요.
      </p>
      <div className="room-detail-reservation-inputs">
        <div className="room-detail-reservation-date-inputs">
          <div className="room-detail-reservation-check-in">
            <label>
              체크인
              <DatePicker
                placeholderText="날짜추가"
                popperPlacement="end"
                selected={endDate}
                monthsShown={2}
                onChange={(date) => setEndDate(date as Date)}
                selectsEnd
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                disabledKeyboardNavigation
                minDate={new Date(startDate as Date)}
              />
            </label>
          </div>
          <div className="room-detail-reservation-check-out">
            <label>
              체크아웃
              <DatePicker
                placeholderText="날짜추가"
                popperPlacement="bottom-end"
                selected={endDate}
                monthsShown={2}
                onChange={(date) => setEndDate(date as Date)}
                selectsEnd
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                disabledKeyboardNavigation
                minDate={new Date(startDate as Date)}
              />
            </label>
          </div>
        </div>
        <div className="room-detail-reservation-guests-count-wrapper">
          <OutsideClickHandler
            onOutsideClick={() => {
              setGuestCountPopupOpened(false);
            }}
          >
            <div
              role="presentation"
              className="room-detail-reservation-guests-count"
              onClick={() => setGuestCountPopupOpened(!guestCountPopupOpened)}
            >
              <span>인원</span>
              <p>게스트 1명</p>
            </div>
            {guestCountPopupOpened && (
              <div className="room-detail-reservation-guests-popup">
                <div className="mb-24">
                  <Counter
                    label="성인"
                    description="만 13세 이상"
                    minValue={1}
                    value={adultCount}
                    onChange={(count) => setAdultCount(count)}
                  />
                </div>
                <div className="mb-24">
                  <Counter
                    label="어린이"
                    description="2~12세"
                    value={childrenCount}
                    onChange={(count) => setChildrenCount(count)}
                  />
                </div>
                <Counter
                  label="유아"
                  description="2세 미만"
                  value={infantsCount}
                  onChange={(count) => setInfantsCount(count)}
                />
              </div>
            )}
          </OutsideClickHandler>
        </div>
      </div>
      <Button color="amaranth" width="100%">
        예약 가능 여부 보기
      </Button>
    </Container>
  );
};

export default RoomDetailReservation;