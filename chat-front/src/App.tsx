import { Route, Routes } from 'react-router-dom';
import './App.css';
import SilvioChat from './pages/Silvio/SilvioChat';
import MovieRecommend from './pages/MovieRecommend/MovieRecommend';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route index path="/" element={ <Home /> } />
        <Route path="/silvio" element={ <SilvioChat /> } />
        <Route path="/movie" element={ <MovieRecommend /> } />
      </Routes>
    </div>
  );
}

export default App;
