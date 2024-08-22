/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import CommonHeader from '@/components/header/CommonHeader';
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

const CrewPrivateChatPage = () => {
  const navigate = useNavigate();
  const { crewId, receiverId } = useParams();
  const [messages, setMessages] = useState<ChatRespDto[] | null>([]);
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const senderId = localStorage.getItem('MEMBER_ID');
  const token = sessionStorage.getItem('ACCESS_TOKEN');

  const clientRef: React.MutableRefObject<null> = useRef(null);
  const subscriptionRef: React.MutableRefObject<null> = useRef(null);

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

  useEffect(() => {
    if (receiverId && crewId) {
      fetchMessages();
      connect();
    }
    return () => {
      disconnect();
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [receiverId, crewId]);

  const fetchMessages = async () => {
    let response: any;
    try {
      response = await axios.get(`/crews/${crewId}/chats`, {
        params: { receiverId },
      });
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
      reconnectDelay: 5000,
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
        `/topic/messages/private/${crewId}/${receiverId}`,
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
      const chatMessage = { senderId, receiverId, message, crewId };
      clientRef.current.publish({
        destination: `/app/send/private/${crewId}/${receiverId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    } else {
      console.error(
        '클라이언트가 연결되어 있지 않거나 메시지가 비어 있습니다.',
      );
    }
  }, [isConnected, message, senderId, receiverId, crewId]);

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
    setIsConnected(false);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const myMemberId = localStorage.getItem('MEMBER_ID');

  const renderMessages = () => {
    let lastDate = null;

    return messages.map((msg, idx) => {
      const messageDate = new Date(msg.data.createDate);
      const messageDateString = messageDate.toLocaleDateString();
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
            />
            <div className={styles.messageContent}>
              <span className={styles.nickname}>
                {msg.data.member.nickname}
              </span>
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
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader
          title="1:1 채팅"
          crewId={crewId}
          onClick={() => navigate(`/crew/${crewId}`)}
        />
        <CrewNavigation id={crewId} />
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {messages && messages.length > 0 ? (
        <div className={styles.messageList}>{renderMessages()}</div>
      ) : (
        <div>아직 채팅이 없습니다.</div>
      )}
      <div className={styles.input_container}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

export default CrewPrivateChatPage;
