import { useNavigate } from 'react-router-dom';
import corkboard from '../assets/corkboard.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="home"
      style={{ backgroundImage: `url(${corkboard})` }}
    >
      <h1>TRACEPOINT INVESTIGATIONS</h1>
      <h2>THE MISSING PROTOTYPE</h2>
      <p>A prototype has disappeared from a secure research laboratory.</p>
      <p>Your task is to investigate the evidence and identify the most likely suspect.</p>
      <button onClick={() => navigate('/case')}>START INVESTIGATION</button>
    </main>
  );
}

export default Home;