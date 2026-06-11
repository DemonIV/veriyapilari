import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPalette from './SearchPalette';

const dataStructures = [
  { path: '/veri-yapilari/diziler', label: '📦 Diziler (Arrays)' },
  { path: '/veri-yapilari/bagli-liste', label: '🔗 Bağlı Listeler' },
  { path: '/veri-yapilari/yigin', label: '📚 Yığın (Stack)' },
  { path: '/veri-yapilari/kuyruk', label: '🚶 Kuyruk (Queue)' },
  { path: '/veri-yapilari/agac', label: '🌳 Ağaç (Tree)' },
  { path: '/veri-yapilari/graf', label: '🕸️ Graf' },
  { path: '/veri-yapilari/hash-tablosu', label: '🗂️ Hash Tablosu' },
  { path: '/veri-yapilari/heap', label: '⛰️ Heap' },
];

const algorithms = [
  { path: '/algoritmalar/siralama', label: '📊 Sıralama Algoritmaları' },
  { path: '/algoritmalar/arama', label: '🔍 Arama Algoritmaları' },
  { path: '/algoritmalar/dinamik-programlama', label: '⚡ Dinamik Programlama' },
  { path: '/algoritmalar/graf-algoritmalari', label: '🕸️ Graf Algoritmaları' },
  { path: '/algoritmalar/acgozlu', label: '💰 Açgözlü Algoritmalar' },
  { path: '/algoritmalar/bolum-fethet', label: '⚔️ Böl ve Fethet' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(open => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(10, 14, 26, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, color: 'white', fontSize: '1.1rem'
          }}>A</div>
          <span style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px'
          }}>AlgoTR</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }} className="desktop-nav">
          <Link to="/" style={{
            padding: '6px 14px', borderRadius: 6, color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none'
          }}>Ana Sayfa</Link>

          {/* Veri Yapıları Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('ds')}
            onMouseLeave={() => setActiveDropdown(null)}>
            <button style={{
              padding: '6px 14px', borderRadius: 6, background: 'none', border: 'none',
              color: location.pathname.includes('/veri-yapilari') ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
            }}>Veri Yapıları <span style={{ fontSize: '0.7rem' }}>▼</span></button>
            {activeDropdown === 'ds' && (
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 10, padding: 8, minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                zIndex: 100
              }}>
                {dataStructures.map(item => (
                  <Link key={item.path} to={item.path} style={{
                    display: 'block', padding: '8px 12px', borderRadius: 6,
                    color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none'
                  }}
                    onMouseEnter={e => { e.target.style.color = 'var(--primary)'; e.target.style.background = 'rgba(108,99,255,0.08)'; }}
                    onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.background = 'none'; }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Algoritmalar Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('algo')}
            onMouseLeave={() => setActiveDropdown(null)}>
            <button style={{
              padding: '6px 14px', borderRadius: 6, background: 'none', border: 'none',
              color: location.pathname.includes('/algoritmalar') ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
            }}>Algoritmalar <span style={{ fontSize: '0.7rem' }}>▼</span></button>
            {activeDropdown === 'algo' && (
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 10, padding: 8, minWidth: 240, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                zIndex: 100
              }}>
                {algorithms.map(item => (
                  <Link key={item.path} to={item.path} style={{
                    display: 'block', padding: '8px 12px', borderRadius: 6,
                    color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none'
                  }}
                    onMouseEnter={e => { e.target.style.color = 'var(--primary)'; e.target.style.background = 'rgba(108,99,255,0.08)'; }}
                    onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.background = 'none'; }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/sorular" style={{
            padding: '6px 14px', borderRadius: 6,
            color: location.pathname === '/sorular' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none'
          }}>Sorular</Link>

          <Link to="/projeler" style={{
            padding: '6px 14px', borderRadius: 6,
            color: location.pathname === '/projeler' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none'
          }}>Projeler</Link>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label="Site içinde ara">
            🔍 <span className="search-trigger-label">Ara</span>
            <kbd className="search-kbd">Ctrl K</kbd>
          </button>
          <a href="https://dotnetfiddle.net" target="_blank" rel="noopener noreferrer"
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white', textDecoration: 'none', whiteSpace: 'nowrap'
            }}>
            ▶ Kodu Çalıştır
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem', cursor: 'pointer' }}
            className="hamburger"
          >☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--bg-card)', borderTop: '1px solid var(--border)',
          padding: '16px 20px'
        }}>
          {[
            { to: '/', label: 'Ana Sayfa' },
            ...dataStructures.map(d => ({ to: d.path, label: d.label })),
            ...algorithms.map(a => ({ to: a.path, label: a.label })),
            { to: '/sorular', label: '❓ Sorular' },
            { to: '/projeler', label: '🚀 Projeler' },
          ].map(item => (
            <Link key={item.to} to={item.to}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '8px 0', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid var(--border)' }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} />}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .search-trigger .search-kbd, .search-trigger .search-trigger-label { display: none; }
        }
      `}</style>
    </nav>
  );
}
