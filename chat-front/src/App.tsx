import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import MovieRecommendation from './components/MovieRecommendation';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/silvio" element={ <Chat /> } />
        <Route path="/movie" element={ <MovieRecommendation /> } />
      </Routes>
    </div>
  );
}

export default App;
