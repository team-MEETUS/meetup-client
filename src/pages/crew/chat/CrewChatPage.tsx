import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Stomp, CompatClient, Client } from '@stomp/stompjs';
import CommonHeader from '@/components/header/CommonHeader';
import axios from 'axios';

import styles from './CrewChatPage.module.scss';

interface ChatRespDto {
  id: number;
  data: {
    message: string;
    senderId: string;
    receiverId: string;
    crewId: string;
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
  const location = useLocation();

  const param = useParams(); // 채널을 구분하는 식별자
  const crewId = param.crewId;
  const receiverId = param.receiverId;
  const senderId = localStorage.getItem('MEMBER_ID');
  const token = sessionStorage.getItem('ACCESS_TOKEN');

  // Stomp의 CompatClient 객체를 참조하는 객체 (리렌더링에도 유지를 위해 useRef 사용)
  // Stomp라이브러리와 소켓 연결을 수행하는 cliet객체에 접근할 수 있게 해준다.
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<any>(null);
  // const compatClient = useRef<CompatClient>(null);

  const [messages, setMessages] = useState<ChatRespDto[] | null>([]); // 채팅 기록
  const [message, setMessage] = useState<string>(''); // 입력된 message를 받을 변수

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 저장된 메시지 조회하고 불러오기
  const fetchMessages = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:8082';
      console.log(token);
      axios.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      const params: any = {};
      let response: any;
      if (receiverId) {
        params.receiverId = receiverId; // receiverId가 있을 경우에만 추가
        response = await axios.get(`/api/v1/crews/${crewId}/chats`, {
          params,
        });
      } else {
        response = await axios.get(`/api/v1/crews/${crewId}/chats`);
      }

      console.log('asdfasdfasdf222222222');

      if (Array.isArray(response.data)) {
        const validMessages = response.data.filter(
          (msg) =>
            msg &&
            msg.data.senderId !== undefined &&
            msg.data.message !== undefined,
        );
        setMessages(validMessages);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error: any) {
      console.error('메시지 가져오기 오류:', error);
      if (error.response && error.response.status === 404) {
        setError('토큰이 유효하지 않습니다. 다시 로그인 해주세요.');
      } else {
        setError('메시지를 가져오는 데 실패했습니다.');
      }
    }
  };

  // 소켓 연결
  const connect = () => {
    console.log('connect start');
    clientRef.current = new Client({
      brokerURL: 'ws://localhost:8082/ws', // WebSocket URL should use `ws://` or `wss://` scheme
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
    console.log('WebSocket 연결 성공');
    if (!subscriptionRef.current) {
      setIsConnected(true);
      subscriptionRef.current = clientRef.current?.subscribe(
        '/topic/messages',
        onMessageReceived,
      );
    }
  };

  const onMessageReceived = (message) => {
    const chatMessage = JSON.parse(message.body);
    if (chatMessage && chatMessage.data !== undefined) {
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages?.some(
          (msg) => msg.id === chatMessage.id,
        );
        if (!isDuplicate) {
          return prevMessages !== null ? [...prevMessages, chatMessage] : null;
        }
        return prevMessages;
      });
    }
  };

  // 컴포넌트가 마운트될 때 connect 함수를 호출
  useEffect(() => {
    fetchMessages();
    connect();
    return () => {
      // 컴포넌트가 언마운트될 때 연결 해제
      clientRef.current?.deactivate();
    };
  }, [token, crewId]);

  // 소켓을 통해 메시지를 전송
  const sendMessage = (message: string) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({
        destination: `/app/send`, // Use `publish` method instead of `send` for sending messages
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crewId: crewId,
          senderId: senderId,
          receiverId: receiverId,
          message: message,
        }),
      });
    }
  };

  const backIconClick = () => {
    sessionStorage.clear();
    navigate(-1);
  };

  useEffect(() => {
    sendMessage(message);
  }, [message]);

  return (
    <div className={styles.container}>
      <CommonHeader title="채팅" onBackClick={() => backIconClick()} />
      {error && <div className={styles.errorMessage}>{error}</div>}
      {messages && messages.length > 0 ? (
        <div className={styles.messageList}>
          {(messages ?? []).map((msg, idx) => (
            <div
              key={idx}
              className={styles.message}
              style={{
                textAlign: msg.data.senderId === senderId ? 'right' : 'left',
              }}
            >
              <img className={styles.sender} src={msg.data.member.saveImg}/>
              <span className={styles.nickname}>{msg.data.member.nickname}</span>
              <span className={styles.content}>{msg.data.message}</span>
              <span className={styles.date}>{msg.data.createDate}</span>
            </div>
          ))}
        </div>
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
          onClick={() => sendMessage(message)}
          className={styles.sendButton}
          // disabled={!isConnected || !message.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
