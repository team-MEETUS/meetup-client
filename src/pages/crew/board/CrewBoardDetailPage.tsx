import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useCrewBoardDetailQuery } from '@/apis/react-query/crew/useCrewBoardQuery';

interface BoardState {
  crewId: string;
  boardId: string;
}

const CrewBoardDetailPage = () => {
  const location = useLocation();

  const state = location.state as BoardState;

  const [crewId] = useState<string>(state.crewId || '');
  const [boardId] = useState<string>(state.boardId || '');

  const { data: crewBoardData } = useCrewBoardDetailQuery(crewId, boardId);

  return (
    <div>
      <h1>CrewBoardDetailPage</h1>
      <div>
        {crewBoardData && (
          <div>
            <div>
              <h2>{crewBoardData.title}</h2>
              <p>{crewBoardData.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewBoardDetailPage;
