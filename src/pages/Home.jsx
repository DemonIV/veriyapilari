import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import useStoredSet, { COMPLETED_TOPICS_KEY, SOLVED_PROBLEMS_KEY } from '../hooks/useStoredSet';

const topicCards = [
  { icon: '📦', title: 'Diziler', desc: 'Temel veri yapısı, index ile O(1) erişim', path: '/veri-yapilari/diziler', type: 'ds', level: 'Başlangıç' },
  { icon: '🔗', title: 'Bağlı Liste', desc: 'Dinamik boyutlu, işaretçi tabanlı yapı', path: '/veri-yapilari/bagli-liste', type: 'ds', level: 'Başlangıç' },
  { icon: '📚', title: 'Yığın (Stack)', desc: 'LIFO prensibi, geri alma işlemleri', path: '/veri-yapilari/yigin', type: 'ds', level: 'Başlangıç' },
  { icon: '🚶', title: 'Kuyruk (Queue)', desc: 'FIFO prensibi, bekleme sıraları', path: '/veri-yapilari/kuyruk', type: 'ds', level: 'Başlangıç' },
  { icon: '🌳', title: 'Ağaç (Tree)', desc: 'BST, AVL, hierarchical veri', path: '/veri-yapilari/agac', type: 'ds', level: 'Orta' },
  { icon: '🗂️', title: 'Hash Tablosu', desc: 'O(1) arama, Dictionary yapısı', path: '/veri-yapilari/hash-tablosu', type: 'ds', level: 'Orta' },
  { icon: '🕸️', title: 'Graf', desc: 'Ağ yapıları, ilişki modelleme', path: '/veri-yapilari/graf', type: 'ds', level: 'Orta' },
  { icon: '⛰️', title: 'Heap', desc: 'Priority Queue, min/max heap', path: '/veri-yapilari/heap', type: 'ds', level: 'Orta' },
  { icon: '📊', title: 'Sıralama', desc: 'Bubble, Merge, Quick sort...', path: '/algoritmalar/siralama', type: 'algo', level: 'Orta' },
  { icon: '🔍', title: 'Arama', desc: 'Linear, Binary, Interpolation', path: '/algoritmalar/arama', type: 'algo', level: 'Başlangıç' },
  { icon: '⚡', title: 'Dinamik Programlama', desc: 'Memoization, optimal alt yapı', path: '/algoritmalar/dinamik-programlama', type: 'algo', level: 'İleri' },
  { icon: '🕸️', title: 'Graf Algoritmaları', desc: 'BFS, DFS, Dijkstra, Union-Find', path: '/algoritmalar/graf-algoritmalari', type: 'algo', level: 'İleri' },
  { icon: '💰', title: 'Açgözlü Algoritmalar', desc: 'Greedy seçim, aktivite seçimi', path: '/algoritmalar/acgozlu', type: 'algo', level: 'Orta' },
  { icon: '⚔️', title: 'Böl ve Fethet', desc: 'Master theorem, hızlı üs alma', path: '/algoritmalar/bolum-fethet', type: 'algo', level: 'Orta' },
];

const learningPath = [
  { step: 1, title: 'Temeller', items: ['Diziler', 'Bağlı Liste', 'Stack', 'Queue'], color: 'var(--green)' },
  { step: 2, title: 'Orta Seviye', items: ['Hash Tablosu', 'Ağaç (BST)', 'Temel Sıralama', 'Arama'], color: 'var(--blue)' },
  { step: 3, title: 'İleri Seviye', items: ['Graf Algoritmaları', 'Heap / PQ', 'Dinamik Programlama', 'Açgözlü'], color: 'var(--primary)' },
  { step: 4, title: 'Uzman', items: ['Segment Tree', 'Trie', 'Maxflow', 'Bitmask DP'], color: 'var(--orange)' },
];

function ProgressSection() {
  const [completed] = useStoredSet(COMPLETED_TOPICS_KEY);
  const [solved] = useStoredSet(SOLVED_PROBLEMS_KEY);
  const total = topicCards.length;
  const done = topicCards.filter(t => completed.has(t.path)).length;
  const percent = Math.round((done / total) * 100);

  return (
    <section className="card" style={{ marginTop: 40, padding: '24px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
        <h3 style={{ fontSize: '1.05rem' }}>📈 İlerlemen</h3>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <strong style={{ color: 'var(--secondary)' }}>{done}/{total}</strong> konu tamamlandı ·{' '}
          <strong style={{ color: 'var(--secondary)' }}>{solved.size}</strong> soru çözüldü
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 10 }}>
        {done === 0
          ? 'Henüz başlamadın — bir konuyu bitirince sayfanın sağ altındaki "Konuyu tamamladım" butonuyla işaretle.'
          : done === total
            ? 'Tüm konuları bitirdin! 🎉 Şimdi soru bankasında ustalaş.'
            : `Harika gidiyorsun! %${percent} tamamlandı, kaldığın yerden devam et.`}
      </p>
    </section>
  );
}

function TopicCard({ topic, completed }) {
  return (
    <Link to={topic.path} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ height: '100%', position: 'relative' }}>
        {completed && (
          <span title="Tamamlandı" style={{
            position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderRadius: '50%',
            background: 'var(--secondary)', color: '#06281f', fontSize: '0.72rem', fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✓</span>
        )}
        <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{topic.icon}</div>
        <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>{topic.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 12, lineHeight: 1.5 }}>{topic.desc}</p>
        <span className={`badge ${topic.level === 'Başlangıç' ? 'badge-easy' : topic.level === 'Orta' ? 'badge-medium' : 'badge-hard'}`}>
          {topic.level}
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [completed] = useStoredSet(COMPLETED_TOPICS_KEY);
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '100px 0 80px',
        background: 'linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(0,212,170,0.04) 100%)',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)',
            borderRadius: 20, padding: '6px 16px', fontSize: '0.82rem', color: 'var(--primary)',
            fontWeight: 600, marginBottom: 24, letterSpacing: '0.5px'
          }}>🇹🇷 TÜRKÇE EĞİTİM PLATFORMU</div>
          <h1 style={{ marginBottom: 20 }}>
            <span className="gradient-text">C# ile Veri Yapıları</span>
            <br />& Algoritmalar
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Türkiye'nin en kapsamlı Türkçe C# algoritma kaynağı. Sıfırdan ileri seviyeye,
            bol örnek, pratik sorular ve gerçek projelerle öğren.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/veri-yapilari/diziler" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              🚀 Öğrenmeye Başla
            </Link>
            <Link to="/sorular" className="btn btn-outline" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              💡 Soruları Çöz
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 60, flexWrap: 'wrap' }}>
            {[
              { num: '50+', label: 'Konu' },
              { num: '200+', label: 'Kod Örneği' },
              { num: '100+', label: 'Alıştırma' },
              { num: '10+', label: 'Proje' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>{stat.num}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <ProgressSection />
        <AdBanner size="banner" style={{ marginTop: 40 }} />

        {/* Topics */}
        <section className="section">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2>📚 Tüm Konular</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Veri yapıları ve algoritmalar, adım adım Türkçe anlatım</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ marginBottom: 20, color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              📦 Veri Yapıları
            </h3>
            <div className="grid-4">
              {topicCards.filter(t => t.type === 'ds').map(topic => (
                <TopicCard key={topic.path} topic={topic} completed={completed.has(topic.path)} />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <h3 style={{ marginBottom: 20, color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              ⚡ Algoritmalar
            </h3>
            <div className="grid-4">
              {topicCards.filter(t => t.type === 'algo').map(topic => (
                <TopicCard key={topic.path} topic={topic} completed={completed.has(topic.path)} />
              ))}
            </div>
          </div>
        </section>

        <AdBanner size="leaderboard" />

        {/* Learning Path */}
        <section className="section">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2>🗺️ Öğrenme Yolu</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Nereden başlamalısın? İşte önerilen öğrenme sırası</p>
          </div>
          <div className="grid-4">
            {learningPath.map(phase => (
              <div key={phase.step} className="card" style={{ borderTop: `3px solid ${phase.color}` }}>
                <div style={{
                  display: 'inline-flex', width: 32, height: 32, borderRadius: '50%',
                  background: `${phase.color}22`, border: `2px solid ${phase.color}`,
                  alignItems: 'center', justifyContent: 'center',
                  color: phase.color, fontWeight: 800, fontSize: '0.9rem', marginBottom: 12
                }}>{phase.step}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: 12, color: phase.color }}>{phase.title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {phase.items.map(item => (
                    <li key={item} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: phase.color, fontSize: '0.6rem' }}>●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Why AlgoTR */}
        <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2>✨ Neden AlgoTR?</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🇹🇷', title: 'Tamamen Türkçe', desc: 'İngilizce kaynaklara ihtiyaç duymadan, kendi dilinde öğren.' },
              { icon: '💻', title: 'Çalıştırılabilir Kodlar', desc: 'Her örnek .NET Fiddle\'da direkt çalıştırılabilir.' },
              { icon: '📈', title: 'Adım Adım Zorluk', desc: 'Kolay sorulardan başlayarak interview seviyesine ulaş.' },
              { icon: '🔧', title: 'Gerçek Projeler', desc: 'Teori değil pratik. Gerçek dünya projeleri inşa et.' },
              { icon: '🎯', title: 'İnterviewe Hazırlık', desc: 'Google, Microsoft, Amazon sorularına hazırlan.' },
              { icon: '🆓', title: 'Ücretsiz', desc: 'Tüm içerik ücretsiz. Her zaman ücretsiz kalacak.' },
            ].map(item => (
              <div key={item.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner size="banner" style={{ marginBottom: 40 }} />

        {/* CTA */}
        <section style={{
          textAlign: 'center', padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.05))',
          borderRadius: 20, border: '1px solid var(--border)', marginBottom: 80
        }}>
          <h2 style={{ marginBottom: 16 }}>Hemen Başla! 🚀</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Dizilerden başla, graf algoritmalarına kadar ulaş. Her gün biraz pratik yap.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/veri-yapilari/diziler" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              📦 Dizilerden Başla
            </Link>
            <Link to="/projeler" className="btn btn-outline" style={{ padding: '14px 32px' }}>
              🛠️ Projeleri İncele
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
