import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)', padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 64
    }}>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <span className="syne grad-text" style={{ fontSize: 22, fontWeight: 800 }}>CreatorVerse</span>
      </Link>

      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'AI Studio', path: '/ai-studio' },
          { label: 'Trending', path: '/trending' },
          { label: 'AI Coach', path: '/ai-coach' },
          { label: 'Discover', path: '/discover' },
        ].map(link => (
          <Link key={link.path} to={link.path} style={{
            color: 'var(--muted)', fontSize: 14, textDecoration: 'none',
            padding: '6px 12px', borderRadius: 8, transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.target.style.color = 'var(--text)'; e.target.style.background = 'rgba(124,58,237,0.2)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={toggleTheme} style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
          color: 'var(--text)', fontSize: 16
        }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <Link to="/profile">
          <div className="avatar" style={{ cursor: 'pointer', width: 36, height: 36, fontSize: 13 }}>
            {initials}
          </div>
        </Link>

        <button className="btn-outline" onClick={handleLogout} style={{ padding: '6px 16px', fontSize: 13 }}>
          Logout
        </button>
      </div>
    </nav>
  );
}