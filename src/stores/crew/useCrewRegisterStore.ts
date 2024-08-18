/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { GetAllGeoAPIResponseBody } from '@/apis/server/common/geoAPI';
import type {
  GetInterestBigAPI,
  GetInterestSmallAPI,
} from '@/apis/server/interest/InterestAPI';

interface State1 {
  name: string;
  intro: string;
  content: string;
  max: number;
  originalImg: string;
  saveImg: string;
  geoInfo: GetAllGeoAPIResponseBody;
  interestBig: GetInterestBigAPI;
  interestSmall: GetInterestSmallAPI;
}

interface State2 {
  image: File | null;
}

interface Action {
  setInitialData: (data: Partial<State1 & State2>) => void;

  updateName: (name: State1['name']) => void;
  updateIntro: (intro: State1['intro']) => void;
  updateContent: (content: State1['content']) => void;
  updateMax: (max: State1['max']) => void;
  updateOriginalImg: (originalImg: State1['originalImg']) => void;
  updateSaveImg: (saveImg: State1['saveImg']) => void;
  updateGeoInfo: (geoInfo: State1['geoInfo']) => void;
  updateInterestBig: (interestBig: State1['interestBig']) => void;
  updateInterestSmall: (interestSmall: State1['interestSmall']) => void;
  updateImage: (image: State2['image']) => void;
  resetRegisterStore: () => void;
}

const useCrewRegisterStore = create<State1 & Action & State2>((set) => ({
  name: '',
  intro: '',
  content: '',
  max: 0,
  originalImg: '',
  saveImg: '',
  geoInfo: {
    geoId: null,
    city: '',
    district: '',
  },
  interestBig: { interestBigId: null, name: '', icon: '' },
  interestSmall: { interestSmallId: null, name: '' },
  image: null,

  setInitialData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  updateName: (name) => set(() => ({ name })),
  updateIntro: (intro) => set(() => ({ intro })),
  updateContent: (content) => set(() => ({ content })),
  updateMax: (max) => set(() => ({ max })),
  updateOriginalImg: (originalImg) => set(() => ({ originalImg })),
  updateSaveImg: (saveImg) => set(() => ({ saveImg })),
  updateGeoInfo: (geoInfo) => set(() => ({ geoInfo })),
  updateInterestBig: (interestBig) => set(() => ({ interestBig })),
  updateInterestSmall: (interestSmall) => set(() => ({ interestSmall })),
  updateImage: (image) => set(() => ({ image })),

  resetRegisterStore: () =>
    set({
      name: '',
      content: '',
      max: 0,
      geoInfo: {
        geoId: null,
        city: '',
        district: '',
        county: '',
      },
      interestBig: { interestBigId: null, name: '', icon: '' },
      interestSmall: { interestSmallId: null, name: '' },
      image: null,
    }),
}));

export default useCrewRegisterStore;
