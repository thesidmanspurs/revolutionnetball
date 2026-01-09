
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const containerSizes = {
    sm: "h-10 w-10",
    md: "h-12 w-12 md:h-16 md:w-16",
    lg: "h-24 w-24 md:h-32 md:w-32"
  };
  
  return (
    <div className={`flex items-center space-x-3 md:space-x-4 group cursor-pointer`}>
      <div className={`${containerSizes[size]} relative flex-shrink-0`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <circle cx="100" cy="100" r="95" fill="#E6B8FF" />
          <ellipse 
            cx="100" cy="100" rx="80" ry="35" 
            fill="none" 
            stroke="#FFD700" 
            strokeWidth="3" 
            transform="rotate(-15, 100, 100)"
            opacity="0.8"
          />
          <g transform="translate(10, 105) rotate(-5)">
            <text 
              x="0" y="0" 
              fill="black" 
              fontFamily="Arial Black, sans-serif" 
              fontSize="28" 
              fontWeight="900" 
              fontStyle="italic"
              style={{ letterSpacing: '-1px' }}
            >
              REVOLUTION
            </text>
            <text 
              x="90" y="22" 
              fill="black" 
              fontFamily="Arial Black, sans-serif" 
              fontSize="18" 
              fontWeight="900" 
              fontStyle="italic"
            >
              NETBALL
            </text>
          </g>
          <g transform="translate(95, 80) scale(0.4)">
            <path 
              d="M10 50 Q -10 20 10 0 Q 30 20 10 50" 
              fill="black" 
              transform="translate(0, 10) rotate(190, 10, 25)"
            />
            <circle cx="10" cy="10" r="35" fill="#D8A0FF" stroke="black" strokeWidth="2" />
            <path d="M-15 10 Q 10 -5 35 10" fill="none" stroke="black" strokeWidth="1" opacity="0.5" />
            <path d="M-15 5 Q 10 20 35 5" fill="none" stroke="black" strokeWidth="1" opacity="0.5" />
            <path d="M10 -15 Q -5 10 10 35" fill="none" stroke="black" strokeWidth="1" opacity="0.5" />
            <path d="M5 -15 Q 20 10 5 35" fill="none" stroke="black" strokeWidth="1" opacity="0.5" />
          </g>
        </svg>
      </div>

      {size !== 'sm' && (
        <div className="flex flex-col">
          <span className="text-white font-black text-lg md:text-2xl tracking-tighter leading-none italic uppercase">Revolution</span>
          <span className="text-[#d9ff00] font-black text-[8px] md:text-[10px] tracking-[0.3em] uppercase leading-none mt-1">Netball Club</span>
        </div>
      )}
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-house', label: 'Home' },
    { id: 'booking', icon: 'fa-calendar-check', label: 'Sessions' },
    { id: 'members', icon: 'fa-user-group', label: 'Sisters' },
    { id: 'chat', icon: 'fa-message', label: 'Chat' },
    { id: 'membership', icon: 'fa-id-card', label: 'Squad' },
    { id: 'profile', icon: 'fa-circle-user', label: 'Profile' },
    { id: 'logout', icon: 'fa-right-from-bracket', label: 'Logout', isAction: true },
  ];

  const handleNavClick = (item: any) => {
    if (item.id === 'logout') {
      onLogout();
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#001a16] overflow-x-hidden">
      <aside className="hidden md:flex flex-col w-80 bg-[#00332c] text-white p-8 sticky top-0 h-screen border-r border-white/5 shadow-2xl">
        <div className="mb-14">
          <Logo />
        </div>
        
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 font-black text-sm uppercase tracking-wider ${
                item.id === 'logout' 
                  ? 'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300'
                  : activeTab === item.id 
                    ? 'bg-[#d9ff00] text-[#00332c] shadow-[0_10px_30px_-10px_rgba(217,255,0,0.5)] scale-105' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fas ${item.icon} w-5 text-center`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="md:hidden bg-[#00332c] text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-xl border-b border-white/5">
        <Logo size="sm" />
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${activeTab === 'profile' ? 'border-[#d9ff00]' : 'border-white/10'}`}
          >
            <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
          </button>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-12 pb-32 md:pb-12 overflow-y-auto">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#00332c]/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-end py-3 px-2 z-[100] rounded-t-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {menuItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center space-y-1.5 flex-1 py-1 transition-all ${
              activeTab === item.id 
                ? 'text-[#d9ff00] -translate-y-1.5' 
                : 'text-white/40'
            }`}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all ${activeTab === item.id ? 'bg-[#d9ff00]/10 shadow-lg ring-1 ring-[#d9ff00]/20' : ''}`}>
              <i className={`fas ${item.icon} text-lg`}></i>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;

