import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Boas-vindas ao GPT App</h1>
      <Link to="/silvio">Silvio</Link>
      <Link to="/movie">Movie</Link>
    </div>
  );
}

export default Home;
