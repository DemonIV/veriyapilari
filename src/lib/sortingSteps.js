export const ALGORITHMS = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  quick: 'Quick Sort',
  merge: 'Merge Sort',
};

// Her algoritma, animasyon oynatıcısının uygulayacağı adım listesi üretir:
// compare → sarı, swap/set → kırmızı, sorted → yeşil kalıcı işaret
export function recordSteps(name, input) {
  const a = [...input];
  const steps = [];
  const compare = (i, j) => steps.push({ type: 'compare', i, j });
  const swap = (i, j) => {
    [a[i], a[j]] = [a[j], a[i]];
    steps.push({ type: 'swap', i, j });
  };
  const set = (i, value) => {
    a[i] = value;
    steps.push({ type: 'set', i, value });
  };
  const sorted = (...idx) => steps.push({ type: 'sorted', indices: idx });

  if (name === 'bubble') {
    for (let end = a.length - 1; end > 0; end--) {
      let swapped = false;
      for (let i = 0; i < end; i++) {
        compare(i, i + 1);
        if (a[i] > a[i + 1]) { swap(i, i + 1); swapped = true; }
      }
      sorted(end);
      if (!swapped) break;
    }
    sorted(...a.keys());
  } else if (name === 'selection') {
    for (let i = 0; i < a.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < a.length; j++) {
        compare(min, j);
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) swap(i, min);
      sorted(i);
    }
    sorted(...a.keys());
  } else if (name === 'insertion') {
    for (let i = 1; i < a.length; i++) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0) {
        compare(j, j + 1);
        if (a[j] <= key) break;
        set(j + 1, a[j]);
        j--;
      }
      set(j + 1, key);
    }
    sorted(...a.keys());
  } else if (name === 'quick') {
    const qs = (lo, hi) => {
      if (lo >= hi) { if (lo === hi) sorted(lo); return; }
      const pivot = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        compare(j, hi);
        if (a[j] < pivot) { if (i !== j) swap(i, j); i++; }
      }
      if (i !== hi) swap(i, hi);
      sorted(i);
      qs(lo, i - 1);
      qs(i + 1, hi);
    };
    qs(0, a.length - 1);
    sorted(...a.keys());
  } else if (name === 'merge') {
    const ms = (lo, hi) => {
      if (lo >= hi) return;
      const mid = Math.floor((lo + hi) / 2);
      ms(lo, mid);
      ms(mid + 1, hi);
      const merged = [];
      let i = lo, j = mid + 1;
      while (i <= mid && j <= hi) {
        compare(i, j);
        merged.push(a[i] <= a[j] ? a[i++] : a[j++]);
      }
      while (i <= mid) merged.push(a[i++]);
      while (j <= hi) merged.push(a[j++]);
      merged.forEach((v, k) => set(lo + k, v));
    };
    ms(0, a.length - 1);
    sorted(...a.keys());
  }

  return steps;
}

export function randomArray(n) {
  return Array.from({ length: n }, () => 10 + Math.floor(Math.random() * 90));
}
