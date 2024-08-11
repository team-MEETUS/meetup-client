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
