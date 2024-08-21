export default {
  newCrewList: (page: string = '1') => [`/crews/new`, page],
  activeCrewList: (page: string = '1') => [`/crews/active`, page],
  searchCrew: (keyword: string, page: string = '1') => [
    `/crews/search`,
    keyword,
    page,
  ],
  myCrewList: () => [`/crews/me`],
  notificationList: () => [`/notifications`],
};
