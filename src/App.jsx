import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Arrays from './pages/datastructures/Arrays';
import LinkedList from './pages/datastructures/LinkedList';
import Stack from './pages/datastructures/Stack';
import Queue from './pages/datastructures/Queue';
import Tree from './pages/datastructures/Tree';
import HashTable from './pages/datastructures/HashTable';
import Sorting from './pages/algorithms/Sorting';
import Searching from './pages/algorithms/Searching';
import DynamicProgramming from './pages/algorithms/DynamicProgramming';
import GraphAlgorithms from './pages/algorithms/GraphAlgorithms';
import Graph from './pages/datastructures/Graph';
import Problems from './pages/Problems';
import Projects from './pages/Projects';
import './index.css';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
      <h2 style={{ marginBottom: 12 }}>Sayfa Bulunamadı</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Bu sayfa henüz yapım aşamasında.</p>
      <a href="/" className="btn btn-primary">Ana Sayfaya Dön</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veri-yapilari/diziler" element={<Arrays />} />
          <Route path="/veri-yapilari/bagli-liste" element={<LinkedList />} />
          <Route path="/veri-yapilari/yigin" element={<Stack />} />
          <Route path="/veri-yapilari/kuyruk" element={<Queue />} />
          <Route path="/veri-yapilari/agac" element={<Tree />} />
          <Route path="/veri-yapilari/hash-tablosu" element={<HashTable />} />
          <Route path="/veri-yapilari/graf" element={<Graph />} />
          <Route path="/algoritmalar/siralama" element={<Sorting />} />
          <Route path="/algoritmalar/arama" element={<Searching />} />
          <Route path="/algoritmalar/dinamik-programlama" element={<DynamicProgramming />} />
          <Route path="/algoritmalar/graf-algoritmalari" element={<GraphAlgorithms />} />
          <Route path="/sorular" element={<Problems />} />
          <Route path="/projeler" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
