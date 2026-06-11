import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-card)', borderTop: '1px solid var(--border)',
      padding: '60px 0 30px'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>
              <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AlgoTR</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
              Türkiye'nin en kapsamlı C# veri yapıları ve algoritmalar eğitim platformu.
              Ücretsiz, Türkçe, Açıklayıcı.
            </p>
          </div>

          {/* Veri Yapıları */}
          <div>
            <h4 style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--text)' }}>Veri Yapıları</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['/veri-yapilari/diziler', 'Diziler'],
                ['/veri-yapilari/bagli-liste', 'Bağlı Listeler'],
                ['/veri-yapilari/yigin', 'Yığın'],
                ['/veri-yapilari/kuyruk', 'Kuyruk'],
                ['/veri-yapilari/agac', 'Ağaç'],
                ['/veri-yapilari/hash-tablosu', 'Hash Tablosu'],
              ].map(([to, label]) => (
                <li key={to}><Link to={to} style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Algoritmalar */}
          <div>
            <h4 style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--text)' }}>Algoritmalar</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['/algoritmalar/siralama', 'Sıralama'],
                ['/algoritmalar/arama', 'Arama'],
                ['/algoritmalar/dinamik-programlama', 'Dinamik Programlama'],
                ['/algoritmalar/graf-algoritmalari', 'Graf Algoritmaları'],
                ['/algoritmalar/acgozlu', 'Açgözlü'],
                ['/sorular', 'Alıştırma Soruları'],
              ].map(([to, label]) => (
                <li key={to}><Link to={to} style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Dış Kaynaklar */}
          <div>
            <h4 style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--text)' }}>Kaynaklar</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['https://dotnetfiddle.net', '.NET Fiddle (Online IDE)'],
                ['https://visualgo.net', 'VisuAlgo (Animasyonlar)'],
                ['https://leetcode.com', 'LeetCode (Sorular)'],
                ['https://learn.microsoft.com/tr-tr/dotnet/csharp/', 'Microsoft C# Docs'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--secondary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                    ↗ {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            © 2024 AlgoTR — Türkiye'nin C# Algoritma Platformu
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Eğitim amaçlı hazırlanmıştır. Tüm kodlar test edilmiştir.
          </p>
        </div>
      </div>
    </footer>
  );
}
