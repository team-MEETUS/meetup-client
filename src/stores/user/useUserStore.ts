/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { GetUserInfoAPIResponseBody } from '@/types/user/userType';

interface Action {
  updateUser: (data: GetUserInfoAPIResponseBody) => void;
  resetUserStore: () => void;
}

const useUserStore = create<GetUserInfoAPIResponseBody & Action>()(
  persist(
    (set) => ({
      memberId: 0,
      nickname: '',
      saveImg: '',
      intro: '',
      birth: '',
      geo: {
        geoId: null,
        city: '',
        district: '',
      },

      updateUser: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      resetUserStore: () =>
        set(() => ({
          memberId: 0,
          nickname: '',
          saveImg: '',
          intro: '',
          birth: '',

          geo: {
            geoId: null,
            city: '',
            district: '',
          },
        })),
    }),
    {
      name: 'user-store', // 저장소의 이름
      storage: createJSONStorage(() => localStorage), // JSON 저장소를 로컬 스토리지로 설정
    },
  ),
);

export default useUserStore;
