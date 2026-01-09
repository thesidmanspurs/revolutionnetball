
export enum NetballPosition {
  GS = 'Goal Shooter',
  GA = 'Goal Attack',
  WA = 'Wing Attack',
  C = 'Centre',
  WD = 'Wing Defence',
  GD = 'Goal Defence',
  GK = 'Goal Keeper'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferredPosition: NetballPosition;
  membershipStatus: 'None' | 'Bronze' | 'Silver' | 'Gold';
  bio?: string;
  joinedDate: string;
}

export interface Session {
  id: string;
  location: string;
  date: string;
  time: string;
  price: number;
  type: 'Training' | 'Match' | 'Social';
  status: 'Scheduled' | 'Cancelled' | 'Completed';
  weatherAlert?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
}
