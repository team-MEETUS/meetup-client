const formatDate = (dateString: string) => {
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

  return `${formattedDate} ${formattedTime}`;
};

export default formatDate;
