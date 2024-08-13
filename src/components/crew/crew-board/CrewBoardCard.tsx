import classNames from 'classnames/bind';

import { GetAllBoardAPIResponseBody } from '@/types/crew/crewBoardType';

import styles from './CrewBoardCard.module.scss';

interface CrewBoardCardProps extends GetAllBoardAPIResponseBody {
  onClick: () => void;
}

const CrewBoardCard = (props: CrewBoardCardProps) => {
  const cn = classNames.bind(styles);

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
      <span className={cn('board_content')}>{props.content}</span>

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
