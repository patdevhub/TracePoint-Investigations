import { useState, useEffect } from "react";
import InvestigationForm from "../components/InvestigationForm";
import caseClosed from '../assets/caseClosed.jpeg';

function Investigation({ selectedSuspect }) {
  const [suspects, setSuspects] = useState([]);
  const [suspectID, setSuspectID] = useState(
    selectedSuspect ? String(selectedSuspect.suspectID) : ""
  );
  const [conclusion, setConclusion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5291/api/suspects")
      .then((response) => response.json())
      .then((data) => setSuspects(data))
      .catch((error) => console.error("Failed to load suspects:", error));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!suspectID) {
      setMessage("Please select a suspect.");
      return;
    }

    if (!conclusion.trim()) {
      setMessage("Please enter your conclusion.");
      return;
    }

    const investigation = {
      caseID: 1,
      suspectID: Number(suspectID),
      conclusion: conclusion
    };

    try {
      const response = await fetch(
        "http://localhost:5291/api/investigations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(investigation)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit investigation.");
      }

      setMessage(
        "Investigation Submitted Successfully. Your investigation has been recorded by TracePoint Investigations."
      );

      setSuspectID("");
      setConclusion("");
    } catch (error) {
      console.error(error);
      setMessage("There was an error submitting the investigation.");
    }
  }

  return (
    <div
      className="investigation-page"
      style={{ backgroundImage: `url(${caseClosed})` }}
    >
      <div className="page-content">
        <h1>Submit Investigation</h1>

        <InvestigationForm
          suspects={suspects}
          suspectID={suspectID}
          conclusion={conclusion}
          onSuspectChange={(event) => setSuspectID(event.target.value)}
          onConclusionChange={(event) => setConclusion(event.target.value)}
          onSubmit={handleSubmit}
        />

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default Investigation;
