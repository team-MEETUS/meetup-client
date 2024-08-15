import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { useCrewMutation } from '@/apis/react-query/crew/useCrewMutation';
import CrewImageIcon from '@/assets/icons/CrewImageIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import PersonIcon from '@/assets/icons/PersonIcon.svg?react';
import CommonHeader from '@/components/header/CommonHeader';
import useCrewRegisterStore from '@/stores/crew/useCrewRegisterStore';

import styles from './CrewRegisterPage.module.scss';

const CrewRegisterPage = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const { postAddCrew } = useCrewMutation();

  const {
    name,
    // intro,
    content,
    max,
    // originalImg,
    // saveImg,
    geoInfo,
    interestBig,
    interestSmall,
    image,
    updateName,
    // updateIntro,
    updateContent,
    updateMax,
    updateImage,
    resetRegisterStore,
  } = useCrewRegisterStore((state) => ({
    name: state.name,
    intro: state.intro,
    content: state.content,
    max: state.max,
    originalImg: state.originalImg,
    saveImg: state.saveImg,
    geoInfo: state.geoInfo,
    interestBig: state.interestBig,
    interestSmall: state.interestSmall,
    image: state.image,
    updateName: state.updateName,
    updateIntro: state.updateIntro,
    updateContent: state.updateContent,
    updateMax: state.updateMax,
    updateImage: state.updateImage,
    resetRegisterStore: state.resetRegisterStore,
  }));

  const [imageURL, setImageURL] = useState<string | undefined>();

  useEffect(() => {
    if (image) {
      setImageURL(URL.createObjectURL(image));
    }
  }, [image]);

  const handleClickBack = () => {
    navigate('/');
    resetRegisterStore();
  };

  const handleInterestSmallClick = () => {
    if (interestBig.interestBigId === 0) {
      // interestBig이 선택되지 않은 경우
      alert('관심사를 먼저 선택해주세요.');
      navigate('/crew/register/interest-big');
    } else {
      navigate('/crew/register/interest-small');
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
      updateImage(file);
    }
  };

  const handleMakeCrew = async (): Promise<void> => {
    if (!name) {
      alert('모임명을 입력해주세요.');
      return;
    } else if (!geoInfo.geoId) {
      alert('지역을 선택해주세요.');
      return;
    } else if (!interestBig.interestBigId) {
      alert('관심사를 선택해주세요.');
      return;
    }

    const formData = new FormData();

    const data = {
      name,
      content,
      max: Number(max) || 300,
      geoId: geoInfo.geoId ?? null,
      interestBigId: interestBig.interestBigId ?? null,
      interestSmallId: interestSmall.interestSmallId ?? null,
    };

    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', new Blob());
    }

    formData.append(
      'crewSaveReqDto',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
    );

    await postAddCrew.mutateAsync(formData);
  };

  const handleClick = () => {
    handleMakeCrew().catch((error) => {
      console.error('Failed to create crew', error);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader title="모임 개설" onBackClick={handleClickBack} />
      </div>
      <div className={styles.form}>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="crewLocation">
            <LocationIcon />
            중심지역
          </label>
          <input
            id="location"
            type="text"
            placeholder="동 · 읍 · 면 찾기"
            value={geoInfo.city && `${geoInfo.city} ${geoInfo.district}`}
            onClick={() => navigate('/crew/register/location')}
            readOnly
            autoComplete="off"
            className={styles.input}
          />
        </div>
        <div className={styles.form_item}>
          <label className={styles.label} htmlFor="crewInterest">
            <span
              className={styles.interest_icon}
              onClick={() => navigate('/crew/register/interest-big')}
            >
              {interestBig.icon}
            </span>
            상세관심사
          </label>
          <input
            id="crewInterest"
            type="text"
            placeholder="없음"
            value={interestSmall.name}
            onClick={handleInterestSmallClick}
            readOnly
            autoComplete="off"
            className={styles.input}
          />
        </div>
        <div className={styles.form_image} onClick={handleFileClick}>
          {!image ? (
            <>
              <div className={styles.no_image}>
                <CrewImageIcon fill={'var(--orange-400)'} />
                우리 모임의 사진을 올려보세요.
              </div>
              <span className={styles.image_ratio}>비율 20:9</span>
            </>
          ) : (
            <img src={imageURL} alt="모임 사진" className={styles.has_image} />
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
            value={name}
            onChange={(e) => updateName(e.target.value)}
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
          value={content}
          onChange={(e) => updateContent(e.target.value)}
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
            type="number"
            placeholder="300"
            value={max || undefined}
            onChange={(e) =>
              updateMax(
                Number(e.target.value) > 300 ? 300 : Number(e.target.value),
              )
            }
            autoComplete="off"
            className={cx('input', 'max_people')}
          />
        </div>
        <button className={styles.submit_button} onClick={handleClick}>
          모임 만들기
        </button>
      </div>
    </div>
  );
};

export default CrewRegisterPage;
