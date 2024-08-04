import React, { useRef, useState } from 'react';

import classNames from 'classnames/bind';

import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import MeetingImageIcon from '@/assets/icons/MeetingImageIcon.svg?react';
import PersonIcon from '@/assets/icons/PersonIcon.svg?react';
import CommonHeader from '@/components/header/CommonHeader';

import styles from './MeetingRegisterPage.module.scss';

const MeetingRegisterPage: React.FC = () => {
  const cx = classNames.bind(styles);

  const [location, setLocation] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [meetingImage, setMeetingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [meetingName, setMeetingName] = useState<string>('');
  const [meetingDescription, setMeetingDescription] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<string>('');

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMeetingImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader title="모임 개설" />
      </div>
      <form className={styles.form}>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="location">
            <LocationIcon />
            중심지역
          </label>
          <input
            id="location"
            type="text"
            placeholder="동 · 읍 · 면 찾기"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="interest">
            <button className={styles.location_button}></button>
            상세관심사
          </label>
          <input
            id="interest"
            type="text"
            placeholder="없음"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.form_image} onClick={handleClick}>
          {!meetingImage ? (
            <>
              <div className={styles.no_image}>
                <MeetingImageIcon fill={'var(--orange-400)'} />
                우리 모임의 사진을 올려보세요.
              </div>
              <span className={styles.image_ratio}>비율 20:9</span>
            </>
          ) : (
            <img
              src={meetingImage}
              alt="모임 사진"
              className={styles.has_image}
            />
          )}
          <label className={cx('label', 'a11yHidden')} htmlFor="meetingBanner">
            모임 사진
          </label>
          <input
            id="meetingBanner"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className={cx('a11yHidden')}
          />
        </div>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="meetingName">
            모임명
          </label>
          <input
            id="meetingName"
            type="text"
            placeholder="모임 이름"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            className={styles.input}
          />
        </div>

        <label className={cx('a11yHidden')} htmlFor="meetingDescription">
          모임 설명
        </label>
        <textarea
          id="meetingDescription"
          placeholder="모임 목표를 설명해주세요."
          value={meetingDescription}
          onChange={(e) => setMeetingDescription(e.target.value)}
          className={styles.form_description}
        />

        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="maxPeople">
            <PersonIcon />
            정원(최대 300명)
          </label>
          <input
            id="maxPeople"
            type="text"
            placeholder="300"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            className={cx('input', 'max_people')}
          />
        </div>

        <button type="submit" className={styles.submit_button}>
          모임 만들기
        </button>
      </form>
    </div>
  );
};

export default MeetingRegisterPage;
