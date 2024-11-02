export type LoginInfo = {
  user?: User;
  isLoggedIn: boolean;
  message?: string;
};

export type User = {
  username: string;
  email: string;
};
