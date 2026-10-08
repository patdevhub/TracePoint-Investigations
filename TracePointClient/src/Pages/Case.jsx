import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import casefile from '../assets/casefile.png';

function Case() {
  const [caseData, setCaseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5291/api/cases/1")
      .then((response) => response.json())
      .then((data) => setCaseData(data))
      .catch((error) => console.error("Error loading case:", error));
  }, []);

  if (!caseData) {
    return <p>Loading case...</p>;
  }

  return (
    <div
      className="case-page"
      style={{ backgroundImage: `url(${casefile})` }}
    >
      <div className="page-content">
        <h1>{caseData.caseName}</h1>
        <p><strong>Status:</strong> {caseData.status}</p>
        <p>{caseData.description}</p>
        <button onClick={() => navigate("/suspects")}>
          VIEW SUSPECTS
        </button>
      </div>
    </div>
  );
}

export default Case;
