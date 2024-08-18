import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import { useCrewMeetingMutation } from '@/apis/react-query/crew/useCrewMeetingMutation';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import CrewImageIcon from '@/assets/icons/CrewImageIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import PersonIcon from '@/assets/icons/PersonIcon.svg?react';
import CommonHeader from '@/components/header/CommonHeader';
import { GetMeetingListAPIResponseBody } from '@/types/crew/crewMeetingType';
import { getTodayDate } from '@/utils/date';

import styles from './CrewMeetingRegisterPage.module.scss';

const CrewMeetingRegisterPage = () => {
  const cn = classNames.bind(styles);
  const location = useLocation();

  const state = location.state as {
    crewId: string;
    meetingData?: GetMeetingListAPIResponseBody;
    isEdit?: boolean;
  };

  const { postCreateMeeting, putUpdateMeeting, postDeleteMeeting } =
    useCrewMeetingMutation();

  const [crewId] = useState<string>(state.crewId || '');
  const [meetingId] = useState<string>(
    String(state.meetingData?.meetingId) || '',
  );
  const [isEdit] = useState<boolean>(state.isEdit || false);

  // 상태 초기화
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [locationText, setLocationText] = useState<string>('');
  const [locationUrl, setLocationUrl] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(10);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 수정 모드일 때 상태 초기화
  useEffect(() => {
    if (state.meetingData) {
      setImage(state.meetingData.saveImg);
      setName(state.meetingData.name);
      setDate(state.meetingData.date.split('T')[0]);
      setTime(state.meetingData.date.split('T')[1]);
      setLocationText(state.meetingData.loc);
      setLocationUrl(state.meetingData.url);
      setPrice(state.meetingData.price);
      setMaxParticipants(state.meetingData.max);
    }
  }, [state.meetingData]);

  const handleImageClick = () => {
    if (!isEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const data = {
      name,
      date: `${date}T${time}`,
      loc: locationText,
      url: locationUrl,
      price,
      max: maxParticipants,
    };

    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', new Blob());
    }

    formData.append(
      'meetingSaveReqDto',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
    );

    if (isEdit) {
      // 수정 로직 추가
      await putUpdateMeeting.mutateAsync({
        crewId,
        meetingId,
        body: formData,
      });
    } else {
      await postCreateMeeting.mutateAsync({ crewId, body: formData });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정모를 삭제하시겠습니까?')) {
      await postDeleteMeeting.mutateAsync({ crewId, meetingId });
    }
  };

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <CommonHeader title="정모 개설" />
      </div>

      <div className={cn('form')}>
        <div className={cn('form_item')}>
          <label className={cn('a11yHidden')} htmlFor="meetingImage">
            이미지
          </label>
          <div className={cn('image_upload')} onClick={handleImageClick}>
            {image ? (
              <img
                src={image}
                alt="정모 이미지"
                className={cn('preview_image')}
              />
            ) : (
              <div className={cn('no_image')}>
                <CrewImageIcon fill={'var(--orange-400)'} />
                정모사진을 등록해주세요.
              </div>
            )}
          </div>
          <input
            className={cn('input')}
            id="meetingImage"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
            disabled={isEdit} // 수정 시 이미지 변경 불가능
          />
        </div>

        <div className={cn('form_item')}>
          <label htmlFor="meetingName">정모명</label>
          <input
            className={cn('input', 'meeting_name')}
            id="meetingName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="정모 이름"
          />
        </div>

        {/* 날짜 */}
        <div className={cn('form_item')}>
          <label htmlFor="meetingDate">
            <CalendarIcon />
            정모날짜
          </label>
          <input
            className={cn('input')}
            id="meetingDate"
            type="date"
            value={date}
            min={getTodayDate()}
            onChange={(e) => setDate(e.target.value)}
            disabled={isEdit} // 수정 시 날짜 변경 불가능
          />
        </div>

        {/* 시간 */}
        <div className={cn('form_item')}>
          <label htmlFor="meetingTime">
            <ClockIcon />
            시간
          </label>
          <input
            className={cn('input')}
            id="meetingTime"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={isEdit} // 수정 시 시간 변경 불가능
          />
        </div>

        {/* 위치 */}
        <div className={cn('form_item')}>
          <label htmlFor="meetingLocation">
            <LocationIcon />
            위치
          </label>
          <input
            className={cn('input')}
            id="meetingLocation"
            type="text"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="위치를 입력하세요"
          />
        </div>

        {/* 위치 URL */}
        <div className={cn('form_item', 'location_url')}>
          <label className={cn('a11yHidden')} htmlFor="meetingLocationUrl">
            위치 URL
          </label>
          <input
            className={cn('input')}
            id="meetingLocationUrl"
            type="url"
            value={locationUrl}
            onChange={(e) => setLocationUrl(e.target.value)}
            placeholder="위치 URL을 입력하세요"
          />
        </div>

        {/* 금액 */}

        <div className={cn('form_item')}>
          <label htmlFor="meetingPrice">
            <MoneyIcon />
            금액
          </label>
          <input
            className={cn('input')}
            id="meetingPrice"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="참가비를 입력하세요"
          />
        </div>

        {/* 정원 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="meetingMaxPeople">
            <PersonIcon />
            정원 (최대 300명)
          </label>
          <input
            className={cn('input', 'max_people')}
            id="meetingMaxPeople"
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            placeholder="300"
          />
        </div>

        {/* 제출 버튼 */}
        <button className={cn('submit_button')} onClick={handleSubmit}>
          {isEdit ? '수정 완료' : '정모 개설'}
        </button>
      </div>

      {isEdit ? (
        <button className={cn('delete_button')} onClick={handleDelete}>
          정모 삭제하기
        </button>
      ) : null}
    </div>
  );
};

export default CrewMeetingRegisterPage;
