import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import AdBanner from '../components/AdBanner';
import useStoredSet, { SOLVED_PROBLEMS_KEY } from '../hooks/useStoredSet';
import { allProblems, difficultyMap, topics } from '../data/problems';

export default function Problems() {
  const [open, setOpen] = useState(null);
  const [filterDiff, setFilterDiff] = useState('Tümü');
  const [filterTopic, setFilterTopic] = useState('Tümü');
  const [solved, toggleSolved] = useStoredSet(SOLVED_PROBLEMS_KEY);

  const filtered = allProblems.filter(p => {
    const diffOk = filterDiff === 'Tümü' || difficultyMap[p.difficulty] === filterDiff;
    const topicOk = filterTopic === 'Tümü' || p.topic === filterTopic;
    return diffOk && topicOk;
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Sorular</div>
          <h1>💡 Alıştırma Soruları</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Kolay'dan Zor'a kadar C# ile çözümlü sorular. Her soruyu önce kendin çöz,
            sonra çözümü incele. Mülakat hazırlığı için kritik.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <AdBanner size="banner" style={{ marginBottom: 32 }} />

        {/* İstatistikler */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { label: 'Toplam', count: allProblems.length, color: 'var(--primary)' },
            { label: 'Kolay', count: allProblems.filter(p => p.difficulty === 'easy').length, color: 'var(--green)' },
            { label: 'Orta', count: allProblems.filter(p => p.difficulty === 'medium').length, color: 'var(--yellow)' },
            { label: 'Zor', count: allProblems.filter(p => p.difficulty === 'hard').length, color: 'var(--red)' },
            { label: 'Çözüldü', count: solved.size, color: 'var(--secondary)' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: `1px solid ${s.color}44`,
              borderRadius: 10, padding: '12px 20px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtreler */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>Zorluk</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Tümü', 'Kolay', 'Orta', 'Zor'].map(d => (
                <button key={d} onClick={() => setFilterDiff(d)}
                  className={`btn ${filterDiff === d ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '6px 14px' }}>{d}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>Konu</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {topics.map(t => (
                <button key={t} onClick={() => setFilterTopic(t)}
                  className={`btn ${filterTopic === t ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.78rem', padding: '5px 12px' }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Listesi */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((p, idx) => (
            <div key={p.id}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => setOpen(open === p.id ? null : p.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      onClick={e => { e.stopPropagation(); toggleSolved(p.id); }}
                      title={solved.has(p.id) ? 'Çözüldü işaretini kaldır' : 'Çözdüm olarak işaretle'}
                      style={{
                        width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', flexShrink: 0,
                        border: `2px solid ${solved.has(p.id) ? 'var(--secondary)' : 'var(--border)'}`,
                        background: solved.has(p.id) ? 'var(--secondary)' : 'transparent',
                        color: '#06281f', fontSize: '0.7rem', fontWeight: 800, lineHeight: 1
                      }}
                    >{solved.has(p.id) ? '✓' : ''}</button>
                    <span style={{ color: 'var(--text-dim)', fontWeight: 700, minWidth: 28 }}>#{p.id}</span>
                    <span style={{ fontWeight: 600, color: solved.has(p.id) ? 'var(--secondary)' : 'inherit' }}>{p.title}</span>
                    <span className={`badge badge-${p.difficulty}`}>{difficultyMap[p.difficulty]}</span>
                    <span style={{
                      background: 'rgba(108,99,255,0.1)', color: 'var(--primary)',
                      padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem'
                    }}>{p.topic}</span>
                  </div>
                  <span style={{ color: 'var(--primary)', fontSize: '1.2rem', flexShrink: 0 }}>
                    {open === p.id ? '▲' : '▼'}
                  </span>
                </div>
                {open === p.id && (
                  <div className="accordion-body">
                    <p style={{ color: 'var(--text-muted)', marginBottom: 12, fontSize: '0.95rem' }}>{p.desc}</p>
                    {p.hint && (
                      <div className="info-box tip" style={{ marginBottom: 16 }}>
                        <div className="info-title">💡 İpucu</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.hint}</p>
                      </div>
                    )}
                    <CodeBlock code={p.code} language="csharp" filename={`${p.title}.cs`} />
                  </div>
                )}
              </div>
              {(idx + 1) % 4 === 0 && <AdBanner size="banner" style={{ margin: '16px 0' }} />}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <p>Bu filtreyle soru bulunamadı.</p>
          </div>
        )}

        <AdBanner size="leaderboard" style={{ marginTop: 40 }} />
      </div>
    </div>
  );
}
