export type LoginInfo = {
  user?: User;
  isLoggedIn: boolean;
  message?: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  friends?: User[] | [];
  pendingFriendRequests?: User[] | [];
  createdAt: Date;
  lastOnline?: Date;
};

export type Room = {
  _id: string;
  name: string;
  members: User[];
  messages: Message[];
  createdAt: Date;
  isGroupChat: boolean;
};

export type Message = {
  _id: string;
  sender: User;
  content: string;
  room: string;
  timestamp: Date;
  seenBy: User[];
};
