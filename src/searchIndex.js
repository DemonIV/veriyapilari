// Site içi arama dizini: her kayıt bir sayfa veya sayfa içi önemli bir konu.
export const SEARCH_INDEX = [
  { path: '/veri-yapilari/diziler', title: 'Diziler (Arrays)', category: 'Veri Yapısı', keywords: 'array dizi bellek index binary search iki pointer two pointer' },
  { path: '/veri-yapilari/bagli-liste', title: 'Bağlı Listeler (Linked List)', category: 'Veri Yapısı', keywords: 'linked list node pointer floyd döngü cycle tekli çift dairesel reverse ters çevir' },
  { path: '/veri-yapilari/yigin', title: 'Yığın (Stack)', category: 'Veri Yapısı', keywords: 'stack lifo push pop parantez monotonic minstack' },
  { path: '/veri-yapilari/kuyruk', title: 'Kuyruk (Queue)', category: 'Veri Yapısı', keywords: 'queue fifo enqueue dequeue deque sliding window kayan pencere' },
  { path: '/veri-yapilari/agac', title: 'Ağaç (Tree) ve BST', category: 'Veri Yapısı', keywords: 'tree binary search tree bst traversal inorder preorder postorder lca derinlik depth' },
  { path: '/veri-yapilari/hash-tablosu', title: 'Hash Tablosu', category: 'Veri Yapısı', keywords: 'hash table dictionary hashset map çakışma collision lru cache anagram' },
  { path: '/veri-yapilari/graf', title: 'Graf (Graph)', category: 'Veri Yapısı', keywords: 'graph vertex edge düğüm kenar komşuluk adjacency bağlı bileşen connected component' },
  { path: '/veri-yapilari/heap', title: 'Heap (Yığın Ağacı)', category: 'Veri Yapısı', keywords: 'heap min max priorityqueue öncelik kuyruğu heapify top k sift' },
  { path: '/algoritmalar/siralama', title: 'Sıralama Algoritmaları', category: 'Algoritma', keywords: 'sort sorting bubble merge quick heap insertion selection stable görselleştirme visualizer' },
  { path: '/algoritmalar/arama', title: 'Arama Algoritmaları', category: 'Algoritma', keywords: 'search binary search ikili arama linear lower upper bound rotated karekök sqrt' },
  { path: '/algoritmalar/dinamik-programlama', title: 'Dinamik Programlama (DP)', category: 'Algoritma', keywords: 'dynamic programming dp memoization tabulation knapsack sırt çantası lcs lis coin change fibonacci' },
  { path: '/algoritmalar/graf-algoritmalari', title: 'Graf Algoritmaları', category: 'Algoritma', keywords: 'bfs dfs dijkstra en kısa yol shortest path union find kruskal mst topological' },
  { path: '/algoritmalar/acgozlu', title: 'Açgözlü Algoritmalar (Greedy)', category: 'Algoritma', keywords: 'greedy açgözlü aktivite seçimi activity selection jump game huffman aralık interval' },
  { path: '/algoritmalar/bolum-fethet', title: 'Böl ve Fethet (Divide & Conquer)', category: 'Algoritma', keywords: 'divide conquer master theorem fast power hızlı üs inversion merge' },
  { path: '/sorular', title: 'Çözümlü Sorular', category: 'Pratik', keywords: 'problem soru çözüm mülakat interview leetcode kolay orta zor two sum kadane' },
  { path: '/projeler', title: 'Projeler', category: 'Pratik', keywords: 'proje project uygulama pratik konsol console' },
];

// Türkçe karakterleri sadeleştirerek aksan duyarsız eşleşme sağlar
function normalize(text) {
  return text
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
}

export function searchSite(query) {
  const q = normalize(query.trim());
  if (q.length < 2) return [];

  const terms = q.split(/\s+/);
  return SEARCH_INDEX
    .map(entry => {
      const title = normalize(entry.title);
      const keywords = normalize(entry.keywords);
      let score = 0;
      for (const term of terms) {
        if (title.startsWith(term)) score += 5;
        else if (title.includes(term)) score += 3;
        else if (keywords.includes(term)) score += 1;
        else return null; // Tüm terimler eşleşmeli
      }
      return { ...entry, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
