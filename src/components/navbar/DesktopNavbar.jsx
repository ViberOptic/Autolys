// src/components/navbar/DesktopNavbar.jsx
import logoUrl from '../../assets/LOGORN.png';
import LanguageSwitcher from '../common/LanguageSwitcher'; // Import component

export default function DesktopNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ev', label: 'EV' },
    { id: 'recommendation', label: 'Sultan' },
    { id: 'favorite', label: 'Favorit' },
    { id: 'about', label: 'About' }
  ];

  return (
    <nav className="hidden md:block shadow-lg border-b border-slate-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="relative group">
              <img
                src={logoUrl}
                alt="Autolys Logo"
                className="w-10 h-10 object-contain filter drop-shadow-sm transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Autolys
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
         
        </div>
      </div>
    </nav>
  );
}