# 🚀 AlgoTR — C# Veri Yapıları ve Algoritmalar

Türkiye'nin en kapsamlı **Türkçe** C# veri yapıları ve algoritmalar eğitim platformu.

## 📚 İçerik

### Veri Yapıları
- 📦 Diziler (Arrays) — bellek modeli, Array API, binary search
- 🔗 Bağlı Listeler — tekli/çift/dairesel, Floyd döngü tespiti
- 📚 Yığın (Stack) — LIFO, monotonic stack, MinStack
- 🚶 Kuyruk (Queue) — FIFO, PriorityQueue, sliding window
- 🌳 Ağaç (Tree) — BST, traversals, LCA, max path sum
- 🗂️ Hash Tablosu — Dictionary, HashSet, LRU Cache
- 🕸️ Graf — temsiller, bağlı bileşenler, döngü tespiti
- ⛰️ Heap — min/max heap, heapify, PriorityQueue, Top-K

### Algoritmalar
- 📊 Sıralama — Bubble/Merge/Quick/Heap + **interaktif görselleştirme**
- 🔍 Arama — Binary search tüm varyantları + **adım adım görselleştirme**
- ⚡ Dinamik Programlama — Knapsack, LCS, Coin Change, LIS
- 🕸️ Graf Algoritmaları — BFS, DFS, Dijkstra, Union-Find + **BFS/DFS görselleştirme**
- 💰 Açgözlü Algoritmalar — aktivite seçimi, Jump Game, Huffman
- ⚔️ Böl ve Fethet — fast power, inversiyon sayma, Master Theorem

### Özellikler
- 🎬 İnteraktif görselleştiriciler: sıralama, binary search ve BFS/DFS
- 🗃️ Soru bankası tek veri dosyasında (`src/data/problems.js`) — yeni soru eklemek kolay
- 🔍 Site içi arama (Ctrl/Cmd+K) — Türkçe karakter duyarsız
- 📈 İlerleme takibi — konu tamamlama ve çözülen soru işaretleme (localStorage)
- 💡 Çözümlü sorular (Kolay/Orta/Zor filtreli)
- 🛠️ Çalıştırılabilir projeler (temel + ileri seviye)
- 🔎 SEO hazır — rota bazlı meta etiketler, sitemap.xml, robots.txt
- 💰 Google AdSense hazır reklam slotları

## 🛠️ Kurulum

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm test         # birim testleri (Vitest)
npm run lint     # ESLint
```

## 🚀 Yayına Alma Notları

1. `src/seo.js` içindeki `SITE_URL` değerini gerçek alan adınızla değiştirin
2. `public/sitemap.xml` ve `public/robots.txt` içindeki URL'leri güncelleyin

## 💰 AdSense Kurulumu

1. `index.html` içindeki AdSense script yorumunu açın ve kendi `ca-pub-...` ID'nizi girin
2. `src/components/AdBanner.jsx` içindeki `data-ad-client` ve `data-ad-slot` değerlerini güncelleyin

## Teknolojiler
React 19 · Vite · React Router · react-syntax-highlighter · Vitest · GitHub Actions
