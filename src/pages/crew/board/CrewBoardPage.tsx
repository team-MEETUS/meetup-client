import { useState } from 'react';

import classNames from 'classnames/bind';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useCrewBoardListQuery } from '@/apis/react-query/crew/useCrewBoardQuery';
import { useCrewDetailQuery } from '@/apis/react-query/crew/useCrewQuery';
import CrewAddIcon from '@/assets/icons/CrewAddIcon.svg?react';
import CrewBoardCard from '@/components/crew/crew-board/CrewBoardCard';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';

import styles from './CrewBoardPage.module.scss';

interface BoardState {
  crewId: string;
}

const CrewBoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cn = classNames.bind(styles);

  const state = location.state as BoardState;

  const [crewId] = useState<string>(state.crewId || '');

  const { data: crewBoardData } = useCrewBoardListQuery(crewId);

  const { data: crewDetailData } = useCrewDetailQuery(crewId);

  const handleClickBoard = (boardId: string) => {
    navigate(`/crew/${crewId}/board/${boardId}`, {
      state: { crewId: crewId, boardId: boardId },
    });
  };

  const handleClickBoardRegister = () => {
    navigate(`/crew/${crewId}/board/register`, {
      state: { crewId: crewId },
    });
  };

  return (
    <>
      <div className={cn('container')}>
        <div>
          {crewDetailData && (
            <div className={cn('crew_detail')}>
              <div className={cn('header')}>
                <CrewHeader
                  crewId={crewId}
                  title={crewDetailData.name}
                  onClick={() => navigate('/')}
                />
                <CrewNavigation id={crewId} />
              </div>
            </div>
          )}

          <div className={cn('board_list')}>
            {crewBoardData &&
              crewBoardData.map((board) => (
                <CrewBoardCard
                  key={board.boardId}
                  {...board}
                  onClick={() => handleClickBoard(String(board.boardId))}
                />
              ))}
          </div>
        </div>
        <span
          className={styles.button_container}
          onClick={handleClickBoardRegister}
        >
          <CrewAddIcon />
        </span>
      </div>
    </>
  );
};

export default CrewBoardPage;
