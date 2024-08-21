import { useEffect, useRef, useState, useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import CommonHeader from '@/components/header/CommonHeader';
import axios from 'axios';
import CrewNavigation from '@/components/crew/crew-navigation/CrewNavigation';
import CrewHeader from '@/components/crew/crew-header/CrewHeader';

interface ChatRespDto {
  data: {
    id: number;
    message: string;
    senderId: string;
    receiverId: string;
    crewId: string;
    createDate: string;
  };
}

const ChatPage = () => {
  const navigate = useNavigate();

  const param = useParams(); // 채널을 구분하는 식별자
  const crewId = param.crewId;
  const receiverId = param.receiverId;
  const senderId = localStorage.getItem('MEMBER_ID');
  const token = sessionStorage.getItem('ACCESS_TOKEN');

  // Stomp의 CompatClient 객체를 참조하는 객체 (리렌더링에도 유지를 위해 useRef 사용)
  // Stomp라이브러리와 소켓 연결을 수행하는 cliet객체에 접근할 수 있게 해준다.
  const clientRef: React.MutableRefObject<null> = useRef(null);
  const subscriptionRef: React.MutableRefObject<null> = useRef(null);
  // const compatClient = useRef<CompatClient>(null);

  const [messages, setMessages] = useState<ChatRespDto[] | null>([]); // 채팅 기록
  const [message, setMessage] = useState<string>(''); // 입력된 message를 받을 변수

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // axios 기본 설정
  axios.defaults.baseURL = 'http://localhost:8082';
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 컴포넌트가 마운트될 때 connect 함수를 호출
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

  // 저장된 메시지 조회하고 불러오기
  const fetchMessages = async () => {
    let response: any;
    try {
      const params: any = {};

      if (receiverId) {
        params.receiverId = receiverId; // receiverId가 있을 경우에만 추가
        response = await axios.get(`/api/v1/crews/${crewId}/chats`, {
          params,
        });
      } else {
        response = await axios.get(`/api/v1/crews/${crewId}/chats`);
      }

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

  // 소켓 연결
  const connect = () => {
    console.log('connect start');
    // STOMP 클라이언트 객체를 생성하고 웹 소켓 연결
    clientRef.current = new Client({
      brokerURL: `http://localhost:8082/ws`, // WebSocket URL
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000, // 자동 재 연결
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
    console.log(clientRef);

    // 연결 시작
    clientRef.current.activate();
  };

  const onConnected = () => {
    console.log('WebSocket 연결 성공');
    if (!subscriptionRef.current) {
      setIsConnected(true);
      subscriptionRef.current = clientRef.current.subscribe(
        '/topic/messages',
        onMessageReceived,
      );
    }
  };

  const onMessageReceived = (message) => {
    const chatMessage = JSON.parse(message.body);
    if (chatMessage && chatMessage.data !== undefined) {
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some(
          (msg) => msg.data.id === chatMessage.id,
        );
        if (!isDuplicate) {
          return [...prevMessages, chatMessage];
        }
        return prevMessages;
      });
    }
  };

  // 소켓을 통해 메시지를 전송
  const sendMessage = useCallback(() => {
    console.log(senderId);

    // client.current가 존재하고 연결되었다면 메시지 전송
    if (isConnected && clientRef.current && message.trim()) {
      const chatMessage = { senderId, receiverId, message, crewId };
      clientRef.current.publish({
        destination: `/app/send/${crewId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    } else {
      console.error(
        '클라이언트가 연결되어 있지 않거나 메시지가 비어 있습니다.',
      );
    }
  }, [isConnected, message, senderId, receiverId, crewId]);

  const backIconClick = () => {
    sessionStorage.clear();
    navigate(-1);
  };

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
    setIsConnected(false);
  };

  return (
    <div>
      <div>
        <CrewHeader
          title="채팅"
          crewId={crewId}
          onClick={() => navigate('/')}
        />
        <CrewNavigation id={crewId} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {messages && messages.length > 0 ? (
        <div style={{ marginBottom: '10px' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.data.senderId === senderId ? 'right' : 'left',
                margin: '5px 0',
              }}
            >
              <strong>{msg.data.senderId}:</strong> {msg.data.message}{' '}
              {msg.data.createDate}
            </div>
          ))}
        </div>
      ) : (
        <div>아직 채팅이 없습니다.</div>
      )}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={sendMessage} disabled={!isConnected || !message.trim()}>
        전송
      </button>
    </div>
  );
};

export default ChatPage;
