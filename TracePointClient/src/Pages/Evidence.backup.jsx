import { useEffect, useState } from "react";
import EvidenceCard from "../components/EvidenceCard";
import evidenceBg from '../assets/evidence.jpg';

function Evidence() {
  const [evidence, setEvidence] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5291/api/evidence")
      .then((response) => response.json())
      .then((data) => setEvidence(data))
      .catch((error) => console.error("Error loading evidence:", error));
  }, []);

  function handleExamine(item) {
    setSelectedEvidence(item);
  }

  return (
    <div
      className="evidence-page"
      style={{ backgroundImage: `url(${evidenceBg})` }}
    >
      <div className="page-content">
        <h1>Evidence</h1>

        <div className="evidence-list">
          {evidence.map((item) => (
            <EvidenceCard
              key={item.evidenceID}
              evidence={item}
              onExamine={handleExamine}
            />
          ))}
        </div>

        {selectedEvidence && (
          <div className="selected-evidence">
            <h2>Evidence Details</h2>
            <p><strong>Title:</strong> {selectedEvidence.title}</p>
            <p><strong>Location:</strong> {selectedEvidence.location}</p>
                      <p><strong>Description:</strong> {selectedEvidence.description}</p>
                      <p><strong>Age:</strong> {selectedEvidence.age}</p>
                      <p><strong>Height:</strong> {selectedEvidence.height}</p>
                      <p><strong>Race:</strong> {selectedEvidence.race}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Evidence;
