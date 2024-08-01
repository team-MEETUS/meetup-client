import React, { useState, ChangeEvent } from 'react';

import styles from './MeetingRegisterPage.module.scss';

const MeetingRegisterPage: React.FC = () => {
  const [area, setArea] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [meetingName, setMeetingName] = useState<string>('');
  const [meetingGoal, setMeetingGoal] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number | ''>('');
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <h1>모임 등록</h1>

      <form className={styles.form}>
        <label className={styles.label}>
          나의 지역:
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          상세관심사:
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          사진 (비율 20:9):
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {image && (
            <div className={styles.imagePreview}>
              <img
                src={image as string}
                alt="Preview"
                className={styles.image}
              />
            </div>
          )}
        </label>

        <label className={styles.label}>
          모임명:
          <input
            type="text"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          모임목표:
          <textarea
            value={meetingGoal}
            onChange={(e) => setMeetingGoal(e.target.value)}
            className={styles.textarea}
            rows={5}
          />
        </label>

        <label className={styles.label}>
          최대 인원수:
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) =>
              setMaxParticipants(e.target.value ? Number(e.target.value) : '')
            }
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          모임 등록
        </button>
      </form>
    </div>
  );
};

export default MeetingRegisterPage;
