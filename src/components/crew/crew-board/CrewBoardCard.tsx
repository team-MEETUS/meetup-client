import classNames from 'classnames/bind';
import sanitizeHtml from 'sanitize-html';

import { GetAllBoardAPIResponseBody } from '@/types/crew/crewBoardType';

import styles from './CrewBoardCard.module.scss';
interface CrewBoardCardProps extends GetAllBoardAPIResponseBody {
  onClick: () => void;
}

const CrewBoardCard = (props: CrewBoardCardProps) => {
  const cn = classNames.bind(styles);

  const getFirstLine = (htmlContent: string) => {
    const div = document.createElement('div');
    div.innerHTML = sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags,
    });

    // 첫 번째 블록 요소 찾기
    const firstBlockElement = div.querySelector(
      'p, div, h1, h2, h3, h4, h5, h6, li, blockquote, strong, em',
    );

    return firstBlockElement ? firstBlockElement.innerHTML : '';
  };

  return (
    <div className={cn('container')} onClick={props.onClick}>
      <div className={cn('board_info')}>
        <div className={cn('info_left')}>
          <span>이미지</span>
          <span>이름</span>
          <span>모임장여부</span>
        </div>
        <span className={cn('info_right')}>{props.createDate}</span>
      </div>
      <span className={cn('board_title')}>{props.title}</span>

      <div
        className={cn('board_content')}
        dangerouslySetInnerHTML={{
          __html: getFirstLine(props.content),
        }}
      />

      <div className={cn('board_status')}>
        <div className={cn('status_left')}>
          <span className={cn('like')}>좋아요 {props.hit}</span>
          <span className={cn('comment')}></span>
        </div>
        <span className={cn('status_right')}>{props.category}</span>
      </div>
    </div>
  );
};

export default CrewBoardCard;
