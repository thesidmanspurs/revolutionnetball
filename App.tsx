
/**
 * REVOLUTION NETBALL - TECHNICAL HANDOVER NOTE
 * -------------------------------------------
 * This application is a high-fidelity React prototype designed for the Revolution Netball community.
 * 
 * CORE TECH STACK:
 * - Framework: React (ES6 Modules)
 * - Styling: Tailwind CSS (Utility-first, custom "Squad Portal" aesthetic)
 * - AI Integration: @google/genai (Gemini 3 Flash/Pro for Tactics, Weather, and Grounding)
 * - Icons: FontAwesome 6.4.0
 * 
 * DATA ARCHITECTURE (CURRENTLY MOCKED):
 * 1. User State: Managed in App.tsx. Needs migration to a global store (Zustand/Redux) or a Backend-as-a-Service (Supabase/Firebase).
 * 2. Sessions: Array-based state. Production requires a PostgreSQL 'sessions' table with capacity constraints.
 * 3. Chat: Local state in Chat.tsx. Production requires WebSockets (Socket.io) or Realtime Database subscriptions.
 * 
 * PENDING INTEGRATIONS FOR PRODUCTION:
 * - Authentication: Secure login flow for the 'Squad Portal' using JWT or a service like Clerk.
 * - Payments: Stripe API integration for Membership Upgrades and Session Bookings.
 * - Storage: S3/Cloudinary for persistence of profile avatars and Athlete ID cards.
 * - Weather: geminiService.ts currently provides tactical forecasts; consider a secondary API (OpenWeather) for raw data.
 */

import React, { useState } from 'react';
import { User, NetballPosition, Session } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Booking from './components/Booking';
import Membership from './components/Membership';
import Profile from './components/Profile';
import Community from './components/Community';
import Chat from './components/Chat';
import Landing from './components/Landing';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatRecipient, setChatRecipient] = useState<User | null>(null);
  const [user, setUser] = useState<User>({
    id: 'u1',
    name: 'Fatima Ahmed',
    email: 'fatima@example.com',
    avatar: 'https://picsum.photos/seed/fatima/200',
    preferredPosition: NetballPosition.WA,
    membershipStatus: 'Gold',
    bio: 'Dedicated Goal Shooter and a proud member of Revolution Netball! Looking to sharpen my footwork and compete in the upcoming regional friendlies.',
    joinedDate: '2023-11-15'
  });

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 's1',
      location: 'London Central Academy',
      date: '2024-05-20',
      time: '18:00',
      price: 8,
      type: 'Training',
      status: 'Scheduled'
    },
    {
      id: 's2',
      location: 'Manchester Netball Hub',
      date: '2024-05-22',
      time: '19:30',
      price: 15,
      type: 'Match',
      status: 'Scheduled',
      weatherAlert: 'Severe weather check in progress...'
    }
  ]);

  const [notifications, setNotifications] = useState<string[]>([
    "🚨 MATCH ALERT: Team roster for Sunday is now live! Check your position.",
    "🌤️ WEATHER UPDATE: Manchester session status will be confirmed 2 hours before start.",
    "💎 MEMBERSHIP: Your Gold tier status has been successfully renewed."
  ]);

  const handleUpdateProfile = (updatedUser: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const handleBookSession = (session: Session) => {
    setSessions(prev => [
        { ...session, id: 'b-' + Date.now() },
        ...prev
    ]);
    setNotifications(prev => [`✅ CONFIRMED: You are booked for ${session.location} on ${session.date}`, ...prev]);
    setActiveTab('dashboard');
  };

  const handleStartChat = (targetUser: User) => {
    setChatRecipient(targetUser);
    setActiveTab('chat');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setChatRecipient(null);
  };

  if (!isLoggedIn) {
    return <Landing onLogin={(credentials) => {
      // In a real app, we'd validate these against a backend (e.g. Supabase Auth)
      setIsLoggedIn(true);
    }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} sessions={sessions} notifications={notifications} onUpdateUser={handleUpdateProfile} onNavigate={setActiveTab} />;
      case 'booking':
        return <Booking onBook={handleBookSession} />;
      case 'membership':
        return <Membership user={user} onUpgrade={(tier) => {
            handleUpdateProfile({ membershipStatus: tier as any });
            setNotifications(prev => [`🎊 CONGRATS: You've upgraded to ${tier} status!`, ...prev]);
        }} />;
      case 'profile':
        return <Profile user={user} onUpdate={handleUpdateProfile} onLogout={handleLogout} />;
      case 'members':
        return <Community currentUser={user} onStartChat={handleStartChat} />;
      case 'chat':
        return <Chat currentUser={user} recipient={chatRecipient} />;
      default:
        return <Dashboard user={user} sessions={sessions} notifications={notifications} onUpdateUser={handleUpdateProfile} onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
