import { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCrewBoardCommentMutation } from '@/apis/react-query/crew/useCrewBoardCommentMutation';
import { useCrewBoardCommentListQuery } from '@/apis/react-query/crew/useCrewBoardCommentQuery';
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

interface Comment {
  id: number;
  content: string;
  isEditing: boolean;
}

const CrewBoardDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as BoardState;

  const [crewId] = useState<string>(state.crewId || '');
  const [boardId] = useState<string>(state.boardId || '');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editCommentContent, setEditCommentContent] = useState<string>('');

  const { data: crewBoardData, error: crewBoardError } =
    useCrewBoardDetailQuery(crewId, boardId);
  const { data: crewBoardCommentList } = useCrewBoardCommentListQuery(
    crewId,
    boardId,
    !!crewBoardError,
  );

  const { PostDeleteBoard, PutUpdateBoardPin } = useCrewBoardMutation();
  const { PostCreateBoardComment, PutUpdateBoardComment, DeleteBoardComment } =
    useCrewBoardCommentMutation();

  useEffect(() => {
    if (crewBoardCommentList) {
      const initialComments = crewBoardCommentList.map((comment) => ({
        id: comment.boardCommentId,
        content: comment.content,
        isEditing: false,
      }));
      setComments(initialComments);
    }
  }, [crewBoardCommentList]);

  const menuItems: MenuItem[] = [
    {
      label: '삭제하기',
      onClick: async () => {
        const isConfirmed = window.confirm(
          '정말로 이 게시글을 삭제하시겠습니까?',
        );
        if (isConfirmed) {
          await PostDeleteBoard.mutateAsync({ crewId, boardId });
          navigate(`/crew/${crewId}/board`, { state: { crewId } });
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
      label: '고정하기',
      onClick: async () => {
        if (window.confirm('게시글을 고정하시겠습니까?')) {
          await PutUpdateBoardPin.mutateAsync({ crewId, boardId });
        } else {
          return;
        }
      },
    },
    {
      label: '공유하기',
      onClick: () => toast.info('해당 기능은 준비중입니다.'),
    },
  ];

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      toast.error('댓글을 입력해 주세요.');
      return;
    }

    try {
      await PostCreateBoardComment.mutateAsync({
        crewId,
        boardId,
        body: { content: newComment },
      });

      setNewComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, isEditing: true } : comment,
      ),
    );
    setEditCommentContent(
      comments.find((comment) => comment.id === id)?.content || '',
    );
  };

  const handleSaveEditComment = async (id: number) => {
    try {
      await PutUpdateBoardComment.mutateAsync({
        crewId,
        boardId,
        commentId: String(id),
        body: { content: editCommentContent },
      });

      setComments(
        comments.map((comment) =>
          comment.id === id
            ? { ...comment, content: editCommentContent, isEditing: false }
            : comment,
        ),
      );
      setEditCommentContent('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    const isConfirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        await DeleteBoardComment.mutateAsync({
          crewId,
          boardId,
          commentId: String(id),
        });

        setComments(comments.filter((comment) => comment.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

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

      {/* 댓글 입력 */}
      <div>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>댓글 추가</button>
      </div>

      {/* 댓글 리스트 */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.isEditing ? (
              <>
                <input
                  type="text"
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                />
                <button onClick={() => handleSaveEditComment(comment.id)}>
                  저장
                </button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <button onClick={() => handleEditComment(comment.id)}>
                  수정
                </button>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  삭제
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewBoardDetailPage;
