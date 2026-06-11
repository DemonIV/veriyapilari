import { useLocation } from 'react-router-dom';
import useStoredSet, { COMPLETED_TOPICS_KEY } from '../hooks/useStoredSet';
import { SEARCH_INDEX } from '../searchIndex';

const topicPaths = SEARCH_INDEX
  .filter(e => e.category === 'Veri Yapısı' || e.category === 'Algoritma')
  .map(e => e.path);

export default function TopicCompleteBar() {
  const { pathname } = useLocation();
  const [completed, toggle] = useStoredSet(COMPLETED_TOPICS_KEY);

  if (!topicPaths.includes(pathname)) return null;

  const done = completed.has(pathname);
  const count = topicPaths.filter(p => completed.has(p)).length;

  return (
    <div className="topic-complete-bar">
      <span className="topic-complete-count">{count}/{topicPaths.length} konu</span>
      <button
        className={`btn ${done ? 'btn-primary' : 'btn-outline'}`}
        style={{ fontSize: '0.82rem', padding: '7px 16px' }}
        onClick={() => toggle(pathname)}
      >
        {done ? '✓ Tamamlandı' : 'Konuyu tamamladım'}
      </button>
    </div>
  );
}
