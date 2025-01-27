import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenAIChat from './Pages/OpenAIChat';
import Landing from './Pages/Landing';
import ElasticGridDeformation from './components/ElasticGridDeformation';
import DepthScan from './components/DepthScan';
import TypewriterEffect from './components/TypewriterEffect;';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/openai-chat" element={<OpenAIChat />} />
        <Route path="/elastic-grid" element={<ElasticGridDeformation />} />
        <Route path="/depth-scan" element={<DepthScan />} />
        <Route path="/typewriter-effect" element={<TypewriterEffect />} />
      </Routes>
    </Router>
  );
}

export default App;
