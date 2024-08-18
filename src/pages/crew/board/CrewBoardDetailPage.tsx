import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCrewBoardMutation } from '@/apis/react-query/crew/useCrewBoardMutation';
import { useCrewBoardDetailQuery } from '@/apis/react-query/crew/useCrewBoardQuery';
import MoreMenuButton from '@/components/common/more-button/MoreButton';
import CommonHeader from '@/components/header/CommonHeader';
import { sanitizeHTML } from '@/utils/sanitizeHTML';
interface BoardState {
  crewId: string;
  boardId: string;
}

interface MenuItem {
  label: string;
  onClick: () => void;
}

const CrewBoardDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as BoardState;

  const [crewId] = useState<string>(state.crewId || '');
  const [boardId] = useState<string>(state.boardId || '');

  const { data: crewBoardData } = useCrewBoardDetailQuery(crewId, boardId);

  const { PostDeleteBoard } = useCrewBoardMutation();

  const menuItems: MenuItem[] = [
    {
      label: '삭제하기',
      onClick: async () => {
        const isConfirmed = window.confirm(
          '정말로 이 게시글을 삭제하시겠습니까?',
        );
        if (isConfirmed) {
          await PostDeleteBoard.mutateAsync({ crewId, boardId });
        } else {
          return;
        }
      },
    },
    {
      label: '수정하기',
      onClick: () => {
        navigate(`/crew/${crewId}/board/register`, {
          state: { crewId: crewId, boardId: boardId },
        });
      },
    },
    {
      label: '공유하기',
      onClick: () => toast.info('해당 기능은 준비중입니다.'),
    },
  ];

  return (
    <div>
      <CommonHeader
        title="게시글"
        option={<MoreMenuButton items={menuItems} />}
        onBackClick={() =>
          navigate(`/crew/${crewId}/board`, { state: { crewId } })
        }
      />
      <div>
        {crewBoardData && (
          <div>
            <div>
              <h2>{crewBoardData.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(crewBoardData.content),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewBoardDetailPage;
