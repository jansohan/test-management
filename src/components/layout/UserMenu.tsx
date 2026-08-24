import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { APP_LABELS } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
      >
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.role}</div>
        </div>

        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
            >
              {APP_LABELS.user.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
