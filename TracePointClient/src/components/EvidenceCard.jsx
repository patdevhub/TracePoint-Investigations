function EvidenceCard({ evidence, onExamine }) {
  return (
    <div className="evidence-card">
      <h2>{evidence.title}</h2>
      <p>
        <strong>Location:</strong> {evidence.location}
      </p>
      <button onClick={() => onExamine(evidence)}>
        Examine Evidence
      </button>
    </div>
  );
}

export default EvidenceCard;