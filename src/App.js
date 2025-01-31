import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenAIChat from './Pages/OpenAIChat';
import Landing from './Pages/Landing';
import Hero from './components/Hero';
import DepthScan from './components/DepthScan';
import TypewriterEffect from './components/TypewriterEffect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/openai-chat" element={<OpenAIChat />} />

        <Route path="/depth-scan" element={<DepthScan />} />
        <Route path="/typewriter-effect" element={<TypewriterEffect />} />
      </Routes>
    </Router>
  );
}

export default App;
