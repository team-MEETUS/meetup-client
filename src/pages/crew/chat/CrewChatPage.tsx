/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { useCrewDetailQuery } from '@/apis/react-query/crew/useCrewQuery';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';

import styles from './CrewChatPage.module.scss';

interface ChatRespDto {
  data: {
    id: number;
    message: string;
    senderId: string;
    receiverId: string;
    crewId: string;
    crewMemberRole: string;
    member: {
      memberId: string;
      nickname: string;
      saveImg: string;
    };
    createDate: string;
  };
}

const ChatPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const crewId = param.crewId;
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(
    null,
  );
  const { data: crewDetailData } = useCrewDetailQuery(crewId);
  const senderId = localStorage.getItem('MEMBER_ID');
  const token = sessionStorage.getItem('ACCESS_TOKEN');

  const clientRef: React.MutableRefObject<null> = useRef(null);
  const subscriptionRef: React.MutableRefObject<null> = useRef(null);

  const [menuVisibility, setMenuVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [messages, setMessages] = useState<ChatRespDto[] | null>([]);
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 스크롤을 제일 아래로 이동시키기 위한 ref

  const VITE_API_URL = useMemo(() => import.meta.env.VITE_API_URL, []);
  axios.defaults.baseURL = `${VITE_API_URL}`;
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 스크롤 하단으로 내리기
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();
    connect();
    return () => {
      disconnect();
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [crewId]);

  const fetchMessages = async () => {
    let response: any;
    try {
      response = await axios.get(`/crews/${crewId}/chats`);
      if (Array.isArray(response.data)) {
        const validMessages = response.data.filter(
          (msg) =>
            msg &&
            msg.data.senderId !== undefined &&
            msg.data.message !== undefined,
        );
        setMessages(validMessages);
      } else {
        console.error('예상치 못한 응답 형식:', response.data);
      }
    } catch (error: any) {
      console.error('메시지 가져오기 오류:', error);
    }
  };

  const VITE_API_WS_URL = useMemo(() => import.meta.env.VITE_API_WS_URL, []);
  const connect = () => {
    clientRef.current = new Client({
      brokerURL: `${VITE_API_WS_URL}`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 60000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onStompError: (error) => {
        console.error('STOMP Error:', error);
        setError('WebSocket 연결에 문제가 발생했습니다.');
        setIsConnected(false);
      },
      onDisconnect: () => {
        console.log('Disconnected');
        setIsConnected(false);
      },
    });
    clientRef.current.activate();
  };

  const onConnected = () => {
    if (!subscriptionRef.current) {
      setIsConnected(true);
      subscriptionRef.current = clientRef.current.subscribe(
        `/topic/messages/group/${crewId}`,
        onMessageReceived,
      );
    }
  };

  const onMessageReceived = (message) => {
    const chatMessage = JSON.parse(message.body);
    if (chatMessage && chatMessage.data !== undefined) {
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some(
          (msg) => msg.data.id === chatMessage.data.id,
        );
        if (!isDuplicate) {
          return [...prevMessages, chatMessage];
        }
        return prevMessages;
      });
    }
  };

  const sendMessage = useCallback(() => {
    if (isConnected && clientRef.current && message.trim()) {
      const chatMessage = {
        senderId,
        receiverId: selectedReceiverId,
        message,
        crewId,
      };
      clientRef.current.publish({
        destination: `/app/send/group/${crewId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    } else {
      console.error(
        '클라이언트가 연결되어 있지 않거나 메시지가 비어 있습니다.',
      );
    }
  }, [isConnected, message, senderId, selectedReceiverId, crewId]);

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
    setIsConnected(false);
  };

  const toggleMenu = (messageId: string) => {
    setMenuVisibility((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    Object.keys(menuRefs.current).forEach((messageId) => {
      if (
        menuRefs.current[messageId] &&
        !menuRefs.current[messageId].contains(event.target as Node)
      ) {
        setMenuVisibility((prev) => ({
          ...prev,
          [messageId]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const myMemberId = localStorage.getItem('MEMBER_ID');

  const handlePrivateMessage = (receiverId: string) => {
    navigate(`/crew/${crewId}/chat/${senderId}/${receiverId}`);
  };

  const renderMessages = () => {
    let lastDate = null;

    return (
      <>
        {messages.map((msg, idx) => {
          const isVisible = menuVisibility[msg.data.id];
          const memberRole = msg.data.crewMemberRole;
          const menuItem: MenuItem[] = [
            {
              label: '1:1 메시지',
              onClick: () => handlePrivateMessage(msg.data.member.memberId),
            },
          ];

          if (memberRole === 'LEADER' || memberRole === 'ADMIN') {
            menuItem.push({
              label: `${msg.data.member.nickname} ${memberRole}`,
              onClick: () => {
                navigate(`/profile`, {
                  state: { crewId },
                });
              },
            });
          }

          const messageDate = new Date(msg.data.createDate);
          const messageDateString = messageDate.toLocaleDateString();
          const messageDateDisplay = messageDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          });

          const showDate = lastDate !== messageDateString;
          lastDate = messageDateString;

          return (
            <div key={idx}>
              {showDate && (
                <div className={styles.dateSeparator}>{messageDateString}</div>
              )}
              <div
                className={
                  msg.data.member.memberId != myMemberId
                    ? styles.message_left
                    : styles.message_right
                }
              >
                <img
                  src={msg.data.member.saveImg}
                  alt=""
                  className={styles.sender}
                  onClick={() => toggleMenu(msg.data.id)}
                />
                {isVisible && (
                  <div
                    className={styles.menu}
                    ref={(el) => (menuRefs.current[msg.data.id] = el)}
                  >
                    <ul>
                      {msg.data.crewMemberRole === 'LEADER' ||
                      msg.data.crewMemberRole === 'ADMIN' ? (
                        <>
                          <li
                            onClick={() =>
                              handlePrivateMessage(msg.data.member.memberId)
                            }
                          >
                            1:1 메시지
                          </li>
                          <li onClick={() => console.log('프로필 보기')}>
                            프로필 보기
                          </li>
                        </>
                      ) : (
                        <li onClick={() => console.log('프로필 보기')}>
                          프로필 보기
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <div className={styles.messageContent}>
                  <div className={styles.member_info}>
                    <span className={styles.nickname}>
                      {msg.data.member.nickname}
                    </span>
                    <span className={styles.role}>
                      {msg.data.crewMemberRole === 'LEADER'
                        ? '모임장'
                        : msg.data.crewMemberRole === 'ADMIN'
                          ? '운영진'
                          : msg.data.crewMemberRole === 'MEMBER'
                            ? ''
                            : msg.data.crewMemberRole}
                    </span>
                  </div>
                  <div className={styles.contentWithDate_left}>
                    <span className={styles.bubble}>{msg.data.message}</span>
                    <span className={styles.date}>
                      {formatTime(msg.data.createDate)}
                    </span>
                  </div>
                  <div className={styles.contentWithDate_right}>
                    <span className={styles.date}>
                      {formatTime(msg.data.createDate)}
                    </span>
                    <span className={styles.bubble}>{msg.data.message}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* 스크롤이 자동으로 마지막 메시지로 이동 */}
        <div ref={messagesEndRef} />
      </>
    );
  };

  // 엔터키 입력을 감지하여 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {crewDetailData && (
          <CrewHeader
            crewId={crewId}
            title={crewDetailData.name}
            onClick={() => navigate('/')}
          />
        )}
        <CrewNavigation id={crewId} />
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.chat_container}>
        {messages && messages.length > 0 ? (
          <div className={styles.messageList}>{renderMessages()}</div>
        ) : (
          <div className={styles.not_comment}>아직 채팅이 없습니다.</div>
        )}
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress} // 엔터키 입력 감지 이벤트 추가
          placeholder="메시지를 입력하세요"
          className={styles.input}
        />
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={!isConnected || !message.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
