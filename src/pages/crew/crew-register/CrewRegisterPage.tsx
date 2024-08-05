import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import CrewImageIcon from '@/assets/icons/CrewImageIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import PersonIcon from '@/assets/icons/PersonIcon.svg?react';
import CommonHeader from '@/components/header/CommonHeader';

import styles from './CrewRegisterPage.module.scss';

interface LocationState {
  selectedLocation?: string;
  geoId?: number;
}

const CrewRegisterPage = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const location = useLocation();

  const [crewLocation, setCrewLocation] = useState<string>('');
  const [, setCrewGeoID] = useState<number>(0);
  const [crewInterest, setCrewInterest] = useState<string>('');
  const [crewImage, setCrewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [crewName, setCrewName] = useState<string>('');
  const [crewDescription, setCrewDescription] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<string>('');

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCrewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const state = location.state as LocationState;
    if (state && state.selectedLocation && state.geoId) {
      setCrewLocation(state.selectedLocation);
      setCrewGeoID(Number(state.geoId));
    }
  }, [location.state]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader title="모임 개설" />
      </div>
      <form className={styles.form}>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="crewLocation">
            <LocationIcon />
            중심지역
          </label>
          <input
            id="location"
            type="text"
            placeholder="동 · 읍 · 면 찾기"
            value={crewLocation}
            onChange={(e) => setCrewLocation(e.target.value)}
            onClick={() => navigate('location')}
            readOnly
            autoComplete="off"
            className={styles.input}
          />
        </div>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="crewInterest">
            <button className={styles.location_button}></button>
            상세관심사
          </label>
          <input
            id="crewInterest"
            type="text"
            placeholder="없음"
            value={crewInterest}
            onChange={(e) => setCrewInterest(e.target.value)}
            autoComplete="off"
            className={styles.input}
          />
        </div>
        <div className={styles.form_image} onClick={handleClick}>
          {!crewImage ? (
            <>
              <div className={styles.no_image}>
                <CrewImageIcon fill={'var(--orange-400)'} />
                우리 모임의 사진을 올려보세요.
              </div>
              <span className={styles.image_ratio}>비율 20:9</span>
            </>
          ) : (
            <img src={crewImage} alt="모임 사진" className={styles.has_image} />
          )}
          <label className={cx('label', 'a11yHidden')} htmlFor="crewBanner">
            모임 사진
          </label>
          <input
            id="crewBanner"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className={cx('a11yHidden')}
          />
        </div>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="crewName">
            모임명
          </label>
          <input
            id="crewName"
            type="text"
            placeholder="모임 이름"
            value={crewName}
            onChange={(e) => setCrewName(e.target.value)}
            autoComplete="off"
            className={styles.input}
          />
        </div>

        <label className={cx('a11yHidden')} htmlFor="crewDescription">
          모임 설명
        </label>
        <textarea
          id="crewDescription"
          placeholder="모임 목표를 설명해주세요."
          value={crewDescription}
          onChange={(e) => setCrewDescription(e.target.value)}
          autoComplete="off"
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
            onChange={(e) =>
              setMaxPeople(
                Number(e.target.value) > 300 ? '300' : e.target.value,
              )
            }
            autoComplete="off"
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

export default CrewRegisterPage;
