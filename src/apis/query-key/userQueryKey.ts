export default {
  login: (data: { phone: string; password: string }) => [`/user/login`, data],
};
