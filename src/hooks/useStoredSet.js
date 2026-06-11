import { useCallback, useState } from 'react';

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

// localStorage destekli Set: konu tamamlama ve çözülen soru takibi için
export default function useStoredSet(key) {
  const [values, setValues] = useState(() => read(key));

  const toggle = useCallback((value) => {
    setValues(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        // Depolama kapalıysa (gizli mod vb.) sadece oturum içinde tut
      }
      return next;
    });
  }, [key]);

  return [values, toggle];
}

export const COMPLETED_TOPICS_KEY = 'algotr:completed-topics';
export const SOLVED_PROBLEMS_KEY = 'algotr:solved-problems';
