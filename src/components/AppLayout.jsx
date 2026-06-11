import Navbar from './Navbar';
import Footer from './Footer';
import TopicCompleteBar from './TopicCompleteBar';

export default function AppLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <TopicCompleteBar />
      <Footer />
    </div>
  );
}
