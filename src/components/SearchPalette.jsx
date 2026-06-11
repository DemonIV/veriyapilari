import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSite } from '../searchIndex';

// Her açılışta yeniden mount edilir (Navbar koşullu render eder),
// böylece sorgu/seçim durumu kendiliğinden sıfırlanır.
export default function SearchPalette({ onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchSite(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const go = (path) => {
    onClose();
    navigate(path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      go(results[selected].path);
    }
  };

  return (
    <div className="search-overlay" onMouseDown={onClose}>
      <div className="search-modal" onMouseDown={e => e.stopPropagation()}>
        <div className="search-input-row">
          <span style={{ fontSize: '1rem' }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Konu ara: heap, dijkstra, knapsack…"
            className="search-input"
          />
          <kbd className="search-kbd">ESC</kbd>
        </div>

        {query.trim().length >= 2 && (
          <div className="search-results">
            {results.length === 0 && (
              <div className="search-empty">"{query}" için sonuç yok</div>
            )}
            {results.map((r, i) => (
              <button
                key={r.path}
                className={`search-result ${i === selected ? 'search-result-active' : ''}`}
                onMouseEnter={() => setSelected(i)}
                onClick={() => go(r.path)}
              >
                <span>{r.title}</span>
                <span className="search-category">{r.category}</span>
              </button>
            ))}
          </div>
        )}

        {query.trim().length < 2 && (
          <div className="search-empty">
            En az 2 karakter yaz · ↑↓ ile gez · Enter ile git
          </div>
        )}
      </div>
    </div>
  );
}
