// Site yayına alındığında gerçek alan adıyla güncelleyin.
// public/sitemap.xml ve public/robots.txt içindeki URL'leri de aynı şekilde değiştirin.
export const SITE_URL = 'https://algotr.dev';
export const SITE_NAME = 'AlgoTR';

const DEFAULT_META = {
  title: 'AlgoTR – C# Veri Yapıları ve Algoritmalar | Türkçe Eğitim',
  description:
    "Türkiye'nin en kapsamlı Türkçe C# veri yapıları ve algoritmalar eğitim platformu. Bol örnek, çözümlü sorular ve çalıştırılabilir projeler.",
};

export const ROUTE_META = {
  '/': DEFAULT_META,
  '/veri-yapilari/diziler': {
    title: 'Diziler (Arrays) – C# ile Veri Yapıları | AlgoTR',
    description:
      "C# dizileri: bellek modeli, Array API'si, çok boyutlu diziler ve binary search. Türkçe anlatım, çalıştırılabilir kod örnekleri.",
  },
  '/veri-yapilari/bagli-liste': {
    title: 'Bağlı Listeler (Linked List) – C# ile Veri Yapıları | AlgoTR',
    description:
      'Tekli, çift yönlü ve dairesel bağlı listeler, Floyd döngü tespiti. C# implementasyonları ve mülakat soruları ile Türkçe anlatım.',
  },
  '/veri-yapilari/yigin': {
    title: 'Yığın (Stack) – C# ile Veri Yapıları | AlgoTR',
    description:
      'Stack (LIFO) veri yapısı: parantez kontrolü, monotonic stack, MinStack. C# kodları ve çözümlü sorularla Türkçe anlatım.',
  },
  '/veri-yapilari/kuyruk': {
    title: 'Kuyruk (Queue) – C# ile Veri Yapıları | AlgoTR',
    description:
      'Queue (FIFO), Deque, PriorityQueue ve sliding window teknikleri. C# örnekleriyle Türkçe kuyruk veri yapısı anlatımı.',
  },
  '/veri-yapilari/agac': {
    title: 'Ağaç (Tree) ve BST – C# ile Veri Yapıları | AlgoTR',
    description:
      'İkili ağaçlar, BST, traversal yöntemleri, LCA ve max path sum. C# implementasyonlarıyla Türkçe ağaç veri yapısı anlatımı.',
  },
  '/veri-yapilari/hash-tablosu': {
    title: 'Hash Tablosu – C# Dictionary ve HashSet | AlgoTR',
    description:
      'Hash tablosu nasıl çalışır? C# Dictionary, HashSet, çakışma çözümleri ve LRU Cache implementasyonu. Türkçe anlatım.',
  },
  '/veri-yapilari/graf': {
    title: 'Graf (Graph) – C# ile Veri Yapıları | AlgoTR',
    description:
      'Graf temsilleri, komşuluk listesi, bağlı bileşenler ve döngü tespiti. C# kodlarıyla Türkçe graf veri yapısı anlatımı.',
  },
  '/veri-yapilari/heap': {
    title: 'Heap ve PriorityQueue – C# ile Veri Yapıları | AlgoTR',
    description:
      'Min-heap, max-heap, heapify ve C# PriorityQueue. Top-K problemleri ve O(n) heap kurma. Türkçe heap anlatımı.',
  },
  '/algoritmalar/siralama': {
    title: 'Sıralama Algoritmaları – Bubble, Merge, Quick, Heap Sort | AlgoTR',
    description:
      'Bubble, Selection, Insertion, Merge, Quick ve Heap Sort C# implementasyonları, karşılaştırma tablosu ve interaktif görselleştirme.',
  },
  '/algoritmalar/arama': {
    title: 'Arama Algoritmaları – Binary Search Varyantları | AlgoTR',
    description:
      'Linear search, binary search ve tüm varyantları: lower bound, upper bound, rotated array. C# kodlarıyla Türkçe anlatım.',
  },
  '/algoritmalar/dinamik-programlama': {
    title: 'Dinamik Programlama – Knapsack, LCS, LIS | AlgoTR',
    description:
      'DP temelleri: memoization, tabulation, Knapsack, Coin Change, LCS ve LIS. C# çözümleriyle Türkçe dinamik programlama anlatımı.',
  },
  '/algoritmalar/graf-algoritmalari': {
    title: 'Graf Algoritmaları – BFS, DFS, Dijkstra, Kruskal | AlgoTR',
    description:
      'BFS, DFS, Dijkstra en kısa yol, Union-Find ve Kruskal MST. C# implementasyonlarıyla Türkçe graf algoritmaları anlatımı.',
  },
  '/algoritmalar/acgozlu': {
    title: 'Açgözlü (Greedy) Algoritmalar – C# Örnekleriyle | AlgoTR',
    description:
      'Greedy ne zaman çalışır? Aktivite seçimi, Jump Game, Huffman kodlama. C# çözümleriyle Türkçe açgözlü algoritma anlatımı.',
  },
  '/algoritmalar/bolum-fethet': {
    title: 'Böl ve Fethet (Divide & Conquer) – C# Örnekleriyle | AlgoTR',
    description:
      'Böl-fethet deseni: hızlı üs alma, maksimum alt dizi, inversiyon sayma ve Master Theorem. Türkçe anlatım, C# kodları.',
  },
  '/sorular': {
    title: 'Çözümlü Algoritma Soruları – Kolay/Orta/Zor | AlgoTR',
    description:
      'C# ile çözülmüş mülakat soruları: dizi, stack, ağaç, graf ve DP. Zorluk seviyesine göre filtrele, ipuçlarıyla öğren.',
  },
  '/projeler': {
    title: 'Veri Yapıları Proje Fikirleri – C# Uygulamaları | AlgoTR',
    description:
      'Veri yapılarını pekiştiren çalıştırılabilir C# projeleri: temelden ileri seviyeye uygulamalı proje fikirleri ve kodları.',
  },
};

export function getMeta(pathname) {
  return ROUTE_META[pathname] || DEFAULT_META;
}
