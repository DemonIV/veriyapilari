import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/Seo';
import Home from './pages/Home';
import './index.css';

const Arrays = lazy(() => import('./pages/datastructures/Arrays'));
const LinkedList = lazy(() => import('./pages/datastructures/LinkedList'));
const Stack = lazy(() => import('./pages/datastructures/Stack'));
const Queue = lazy(() => import('./pages/datastructures/Queue'));
const Tree = lazy(() => import('./pages/datastructures/Tree'));
const HashTable = lazy(() => import('./pages/datastructures/HashTable'));
const Graph = lazy(() => import('./pages/datastructures/Graph'));
const Heap = lazy(() => import('./pages/datastructures/Heap'));
const Sorting = lazy(() => import('./pages/algorithms/Sorting'));
const Searching = lazy(() => import('./pages/algorithms/Searching'));
const DynamicProgramming = lazy(() => import('./pages/algorithms/DynamicProgramming'));
const GraphAlgorithms = lazy(() => import('./pages/algorithms/GraphAlgorithms'));
const Greedy = lazy(() => import('./pages/algorithms/Greedy'));
const DivideConquer = lazy(() => import('./pages/algorithms/DivideConquer'));
const Problems = lazy(() => import('./pages/Problems'));
const Projects = lazy(() => import('./pages/Projects'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 20px', gap: 16 }}>
      <div className="page-spinner" />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Yükleniyor…</span>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
      <h2 style={{ marginBottom: 12 }}>Sayfa Bulunamadı</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Bu sayfa henüz yapım aşamasında.</p>
      <Link to="/" className="btn btn-primary">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Seo />
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/veri-yapilari/diziler" element={<Arrays />} />
            <Route path="/veri-yapilari/bagli-liste" element={<LinkedList />} />
            <Route path="/veri-yapilari/yigin" element={<Stack />} />
            <Route path="/veri-yapilari/kuyruk" element={<Queue />} />
            <Route path="/veri-yapilari/agac" element={<Tree />} />
            <Route path="/veri-yapilari/hash-tablosu" element={<HashTable />} />
            <Route path="/veri-yapilari/graf" element={<Graph />} />
            <Route path="/veri-yapilari/heap" element={<Heap />} />
            <Route path="/algoritmalar/siralama" element={<Sorting />} />
            <Route path="/algoritmalar/arama" element={<Searching />} />
            <Route path="/algoritmalar/dinamik-programlama" element={<DynamicProgramming />} />
            <Route path="/algoritmalar/graf-algoritmalari" element={<GraphAlgorithms />} />
            <Route path="/algoritmalar/acgozlu" element={<Greedy />} />
            <Route path="/algoritmalar/bolum-fethet" element={<DivideConquer />} />
            <Route path="/sorular" element={<Problems />} />
            <Route path="/projeler" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}
