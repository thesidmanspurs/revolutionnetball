
import { NetballPosition, MembershipPlan } from './types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'bronze',
    name: 'Bronze Member',
    price: 15,
    period: 'month',
    features: ['Access to 2 sessions/mo', 'Basic profile', 'Member chat']
  },
  {
    id: 'silver',
    name: 'Silver Member',
    price: 35,
    period: 'month',
    features: ['Access to 6 sessions/mo', 'Match priority', 'Revolution Kit discounts']
  },
  {
    id: 'gold',
    name: 'Gold Member',
    price: 60,
    period: 'month',
    features: ['Unlimited sessions', 'Private coaching', 'Free tournament entries', 'Profile badge']
  }
];

export const NETBALL_POSITIONS = Object.entries(NetballPosition).map(([key, value]) => ({
  code: key,
  label: value
}));

export const LOCATIONS = [
  "London Central Courts",
  "Manchester Netball Centre",
  "Birmingham Sports Hall",
  "Leeds Academy",
  "Leicester Community Hub",
  "Bradford Girls High Sports Hall"
];
