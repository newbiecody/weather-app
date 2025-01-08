import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <div className='light-background p-4 h-full w-[100vw]'>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App
