import classNames from 'classnames/bind';
import sanitizeHtml from 'sanitize-html';

import { GetAllBoardAPIResponseBody } from '@/types/crew/crewBoardType';

import styles from './CrewBoardCard.module.scss';

interface CrewBoardCardProps extends GetAllBoardAPIResponseBody {
  onClick: () => void;
}

const CrewBoardCard = (props: CrewBoardCardProps) => {
  const cn = classNames.bind(styles);

  const getContentWithoutImages = (htmlContent: string) => {
    const div = document.createElement('div');
    div.innerHTML = sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags,
    });

    // 모든 이미지 요소를 제거
    const images = div.querySelectorAll('img');
    images.forEach((img) => img.remove());

    return div.innerHTML; // 이미지가 제거된 HTML 반환
  };

  const getFirstImage = (htmlContent: string) => {
    const div = document.createElement('div');
    div.innerHTML = sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    });

    // 첫 번째 이미지 요소를 찾음
    const firstImageElement = div.querySelector('img');
    return firstImageElement ? firstImageElement.src : '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(
      date,
    );
    return formattedDate.replace('오후', '오후 ').replace('오전', '오전 ');
  };

  const firstImageSrc = getFirstImage(props.content);
  const contentWithoutImages = getContentWithoutImages(props.content); // 이미지가 제거된 텍스트

  // crewMember.role에 따른 텍스트 설정
  const roleText =
    props.crewMember.role === 'LEADER'
      ? '모임장'
      : props.crewMember.role === 'ADMIN'
        ? '운영진'
        : '';

  // 역할에 따른 클래스 설정
  const roleClass =
    props.crewMember.role === 'LEADER'
      ? 'leader'
      : props.crewMember.role === 'ADMIN'
        ? 'admin'
        : '';

  return (
    <div className={cn('container')} onClick={props.onClick}>
      {/* status가 2인 경우에만 제목에 [필독] 표시 */}
      {props.status === 2 && (
        <div className={cn('important_container')}>
          <span className={cn('board_title')}>
            <span className={cn('important')}>[필독] </span>
            {props.title}
          </span>
        </div>
      )}

      {/* 나머지 내용 렌더링 */}
      {props.status !== 2 && (
        <>
          <div className={cn('board_info')}>
            <div className={cn('info_left')}>
              <span>
                <img
                  src={props.crewMember.member.saveImg}
                  className={cn('member_image')}
                />
              </span>
              <span className={cn('member_nickname')}>
                {props.crewMember.member.nickname}
              </span>
              {roleText && (
                <span className={cn('member_role', roleClass)}>{roleText}</span>
              )}
            </div>
            <span className={cn('info_right')}>
              {formatDate(props.createDate)}
            </span>
          </div>
          <span className={cn('board_title')}>{props.title}</span>

          <div className={cn('board_content')}>
            <div className={cn('board_text')}>
              <div
                dangerouslySetInnerHTML={{
                  __html: contentWithoutImages, // 이미지가 제거된 텍스트를 설정
                }}
              />
            </div>
            {firstImageSrc && (
              <div className={cn('board_image')}>
                <img
                  src={firstImageSrc}
                  alt="본문 이미지"
                  className={cn('board_image')}
                />
              </div>
            )}
          </div>

          <div className={cn('board_status')}>
            <div className={cn('status_left')}>
              <span className={cn('like')}>
                조회 <span className={cn('hit_number')}>{props.hit}</span>
              </span>
              {props.totalComment > 0 && (
                <span className={cn('comment')}>
                  댓글{' '}
                  <span className={cn('comment_number')}>
                    {props.totalComment}
                  </span>
                </span>
              )}
            </div>
            <span className={cn('status_right')}>{props.category}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CrewBoardCard;
