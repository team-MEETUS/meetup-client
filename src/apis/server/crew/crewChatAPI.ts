import api from '@/apis';
import { ApiResponse } from '@/apis/server/type';
import { GetAllChatAPIResponseBody } from '@/types/crew/crewChatType';

const GetAllChatAPI = async (crewId: string, receiverId?: string) => {
  const { data } = await api.get<ApiResponse<GetAllChatAPIResponseBody[]>>(
    `/crews/${crewId}/chats`,
    { params: { receiverId } },
  );

  return data;
};

export { GetAllChatAPI };
