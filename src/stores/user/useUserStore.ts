/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { GetUserInfoAPIResponseBody } from '@/types/user/userType';

interface Action {
  updateUser: (data: GetUserInfoAPIResponseBody) => void;
  resetUser: () => void;
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

      resetUser: () =>
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
      name: 'USER_STORE',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
