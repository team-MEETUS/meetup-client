import { useState, useEffect, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCrewBoardCommentMutation } from '@/apis/react-query/crew/useCrewBoardCommentMutation';
import { useCrewBoardCommentListQuery } from '@/apis/react-query/crew/useCrewBoardCommentQuery';
import { useCrewBoardMutation } from '@/apis/react-query/crew/useCrewBoardMutation';
import { useCrewBoardDetailQuery } from '@/apis/react-query/crew/useCrewBoardQuery';
import MoreMenuButton from '@/components/common/more-button/MoreButton';
import CommonHeader from '@/components/header/CommonHeader';
import { sanitizeHTML } from '@/utils/sanitizeHTML';

import styles from './CrewBoardDetail.module.scss';

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
  crewMember: {
    crewMemberId: string;
    role: string;
    member: {
      memberId: string;
      nickname: string;
      saveImg: string;
    };
  };
  createDate: string;
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

  const { data: crewBoardData, isSuccess: crewBoardSuccess } =
    useCrewBoardDetailQuery(crewId, boardId);
  const { data: crewBoardCommentList } = useCrewBoardCommentListQuery(
    crewId,
    boardId,
    crewBoardSuccess,
  );

  const { PostDeleteBoard, PutUpdateBoardPin } = useCrewBoardMutation();
  const { PostCreateBoardComment, PutUpdateBoardComment, DeleteBoardComment } =
    useCrewBoardCommentMutation();

  const commentListRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (crewBoardCommentList) {
      const initialComments = crewBoardCommentList.map((comment) => ({
        id: comment.boardCommentId,
        content: comment.content,
        crewMember: {
          crewMemberId: comment.crewMember.crewMemberId,
          role: comment.crewMember.role,
          member: {
            memberId: comment.crewMember.member.memberId,
            nickname: comment.crewMember.member.nickname,
            saveImg: comment.crewMember.member.saveImg,
          },
        },
        createDate: comment.createDate,
        isEditing: false,
      }));
      setComments(initialComments);
    }
  }, [crewBoardCommentList]);

  const scrollToBottom = () => {
    if (commentListRef.current) {
      commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom whenever comments change
  }, [comments]);

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
      /* empty */
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
      /* empty */
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
        /* empty */
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // 오늘 날짜인지 확인
    const isToday = date.toDateString() === now.toDateString();

    // 날짜 포맷 설정
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    if (isToday) {
      // 오늘 날짜일 경우
      const todayOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const formattedTime = new Intl.DateTimeFormat(
        'ko-KR',
        todayOptions,
      ).format(date);
      return `오늘 ${formattedTime.replace('오후', '오후 ').replace('오전', '오전 ')}`;
    } else {
      // 오늘이 아닐 경우
      const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(
        date,
      );
      return formattedDate.replace('오후', '오후 ').replace('오전', '오전 ');
    }
  };

  const myMemberId = localStorage.getItem('MEMBER_ID');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader
          title="게시글"
          option={<MoreMenuButton items={menuItems} />}
          onBackClick={() =>
            navigate(`/crew/${crewId}/board`, { state: { crewId } })
          }
        />
      </div>
      {crewBoardData && (
        <>
          <div className={styles.member_info}>
            <img
              className={styles.member_image}
              src={crewBoardData.crewMember.member.saveImg}
              alt="회원 이미지"
            />
            <div className={styles.member_details}>
              <div className={styles.nickname_role}>
                <span className={styles.nickname}>
                  {crewBoardData.crewMember.member.nickname}
                </span>
                <span className={styles.role}>
                  {crewBoardData.crewMember.role === 'LEADER'
                    ? '모임장'
                    : crewBoardData.crewMember.role === 'ADMIN'
                      ? '운영진'
                      : crewBoardData.crewMember.role === 'MEMBER'
                        ? ''
                        : crewBoardData.crewMember.role}
                </span>
                <span className={styles.category}>
                  {crewBoardData.category}
                </span>
              </div>
              <span className={styles.date}>
                {formatDate(crewBoardData.createDate)}
              </span>
            </div>
          </div>
          <div className={styles.body}>
            <h2 className={styles.title}>{crewBoardData.title}</h2>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(crewBoardData.content),
              }}
            />
            <div className={styles.commentContainer}>
              <span className={styles.total_comment}>
                댓글 {crewBoardData.totalComment}개
              </span>
            </div>
            <div className={styles.separator}></div>
          </div>
        </>
      )}

      {/* 댓글 리스트 */}
      <div className={styles.commentList} ref={commentListRef}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.comment_member_info}>
              <img
                src={comment.crewMember.member.saveImg}
                className={styles.comment_member_image}
                alt={'회원 이미지'}
              />
              <div className={styles.comment_member_details}>
                <div className={styles.comment_nickname_role}>
                  <span className={styles.nickname}>
                    {comment.crewMember.member.nickname}
                  </span>
                  <span className={styles.role}>
                    {comment.crewMember.role === 'LEADER'
                      ? '모임장'
                      : comment.crewMember.role === 'ADMIN'
                        ? '운영진'
                        : comment.crewMember.role === 'MEMBER'
                          ? ''
                          : comment.crewMember.role}
                  </span>
                  <span className={styles.date}>
                    {formatDate(comment.createDate)}
                  </span>
                </div>
              </div>
            </div>
            {/* 댓글 내용과 버튼을 회원 정보 아래로 이동 */}
            <div className={styles.commentContent}>
              {comment.isEditing ? (
                <>
                  <input
                    type="text"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                  />
                  <div className={styles.comment_button}>
                    <button onClick={() => handleSaveEditComment(comment.id)}>
                      저장
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  {comment.crewMember.member.memberId === myMemberId && ( // Todo: 로그인된 사용자의 memberId와 비교
                    <div className={styles.comment_button}>
                      <button onClick={() => handleEditComment(comment.id)}>
                        수정
                      </button>
                      <button onClick={() => handleDeleteComment(comment.id)}>
                        삭제
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력 */}
      <div className={styles.commentInput}>
        <input
          ref={commentInputRef}
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={() =>
            commentListRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <button onClick={handleAddComment}>등록</button>
      </div>
    </div>
  );
};

export default CrewBoardDetailPage;
