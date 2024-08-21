export default {
  crewChat: (crewId: string) => [`/crews/${crewId}/chat`],
  crewPrivateChat: (crewId: string, receiverId: string) => [
    `/crews/${crewId}/chat/${receiverId}`,
  ],
};
