/* eslint-disable no-unused-vars */
export enum DateType {
  DATE,
  TIME,
  DATE_TIME,
}

export const formatDate = (type: DateType, dateString: string) => {
  const date = new Date(dateString);

  // 2024년 01월 01일 형식으로 변환
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 오후 12:00 형식으로 변환
  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 12시간제(오전/오후)를 사용
  });

  switch (type) {
    case DateType.DATE:
      return formattedDate;

    case DateType.TIME:
      return formattedTime;

    case DateType.DATE_TIME:
      return `${formattedDate} ${formattedTime}`;

    default:
      return formattedDate;
  }
};

export const getDay = (dateString: string) => {
  const date = new Date(dateString);

  // 요일 계산 함수
  const getDayOfWeek = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  // 요일 추가
  const dayOfWeek = getDayOfWeek(date);

  return dayOfWeek;
};

export const setFormatDate = (date: string, time?: string) => {
  const dateObj = new Date(date);

  const timeString = time || '00:00:00';

  const [hours, minutes, seconds = '00'] = timeString.split(':');

  dateObj.setHours(Number(hours), Number(minutes), Number(seconds));

  // ISO 8601 형식으로 변환
  return dateObj.toISOString().slice(0, 19);
};

// 현재 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// 디데이 계산
export const calculateDday = (date: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const meetingDate = new Date(date);
  meetingDate.setHours(0, 0, 0, 0);

  const diffInTime = meetingDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

  // 요일 배열
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[meetingDate.getDay()];

  // 날짜 형식 "MM/DD(요일)"
  const formattedDate = `${String(meetingDate.getMonth() + 1).padStart(2, '0')}/${String(meetingDate.getDate()).padStart(2, '0')}(${dayOfWeek})`;

  // D-Day 계산
  const dDay =
    diffInDays >= 0 ? `D-${diffInDays}` : `D+${Math.abs(diffInDays)}`;

  return `${formattedDate} ${dDay}`;
};
