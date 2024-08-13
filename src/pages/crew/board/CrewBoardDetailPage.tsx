import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useCrewBoardDetailQuery } from '@/apis/react-query/crew/useCrewBoardQuery';

interface BoardState {
  crewId: string;
  boardId: string;
}

const CrewBoardDetailPage = () => {
  const location = useLocation();
  const [crewId, setCrewId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');

  const { data: crewBoardData } = useCrewBoardDetailQuery(crewId, boardId);

  useEffect(() => {
    const state = location.state as BoardState;

    if (state.crewId) {
      setCrewId(state.crewId);
      setBoardId(state.boardId);
    }
  }, [location.state]);

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
