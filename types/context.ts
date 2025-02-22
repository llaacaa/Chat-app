export type LoginInfo = {
  user?: User;
  isLoggedIn: boolean;
  message?: string;
};

export type User = {
  _id: string,
  username: string;
  email: string;
  friends?: User[] | [],
  pendingFriendRequests?: User[] | [],
  createdAt: Date,
  lastOnline?: Date,
};
