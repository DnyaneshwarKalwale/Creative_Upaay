import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainSection from './components/MainSection';


function Layout() {
  return (
    <div className="flex">
  
      <div className="flex-1">
        <MainSection />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;



