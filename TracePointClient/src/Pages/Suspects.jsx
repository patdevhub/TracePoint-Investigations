
import { useEffect, useState } from "react";
import SuspectCard, {
  suspectPhotos
} from "../components/SuspectCard";
import "./Suspects.css";

function Suspects({ selectedSuspect, onSelectSuspect }) {
  const [suspects, setSuspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSuspects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5291/api/suspects",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        setSuspects(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error loading suspects:", err);
          setError("Unable to load suspect records. Check the API connection.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSuspects();

    return () => controller.abort();
  }, []);

  const activeSuspect = suspects.find(
    (suspect) =>
      suspect.suspectID === selectedSuspect?.suspectID
  ) || null;

  const displayValue = (value, suffix = "") => {
    if (value === null || value === undefined || value === "") {
      return "Not recorded";
    }
    return `${value}${suffix}`;
  };

  return (
    <main className="page suspects-page">
      <header className="suspects-page-heading">
        <div>
          <p className="suspects-eyebrow">CASE MANAGEMENT / PERSONS OF INTEREST</p>
          <h1>Suspect Directory</h1>
          <p className="suspects-subtitle">
            Review individuals connected to the investigation.
            Select a profile to examine available case information.
          </p>
        </div>
        <span className="suspects-record-count">
          {suspects.length} Records
        </span>
      </header>

      {loading && (
        <p role="status">Loading suspect records...</p>
      )}

      {error && (
        <p className="suspects-error" role="alert">{error}</p>
      )}

      {!loading && !error && suspects.length === 0 && (
        <p>No suspect records are currently available.</p>
      )}

      <div className="suspect-list">
        {suspects.map((suspect) => (
          <SuspectCard
            key={suspect.suspectID}
            suspect={suspect}
            isSelected={
              activeSuspect?.suspectID === suspect.suspectID
            }
            onSelect={onSelectSuspect}
          />
        ))}
      </div>

      {activeSuspect ? (
        <section className="suspect-dossier">
          <div className="suspect-dossier-heading">
            <div>
              <p className="suspects-eyebrow">SELECTED RECORD</p>
              <h2>Suspect Profile</h2>
            </div>
            <span className="suspect-reference">
              ID #{activeSuspect.suspectID}
            </span>
          </div>

          <div className="suspect-identity">
            {suspectPhotos[activeSuspect.name] && (
              <img
                src={suspectPhotos[activeSuspect.name]}
                alt={`Portrait of ${activeSuspect.name}`}
                className="suspect-profile-photo"
              />
            )}

            <div>
              <h3>{activeSuspect.name}</h3>
              <p className="suspect-job">
                {displayValue(activeSuspect.occupation)}
              </p>
              <span className="suspect-neutral-status">
                Investigation status: Not recorded
              </span>
            </div>
          </div>

          <div className="suspect-section">
            <h3>Personal & Identifying Information</h3>
            <div className="suspect-details-grid">
              <div>
                <span>Full Name</span>
                <strong>{activeSuspect.name}</strong>
              </div>
              <div>
                <span>Suspect ID</span>
                <strong>{activeSuspect.suspectID}</strong>
              </div>
              <div>
                <span>Occupation</span>
                <strong>
                  {displayValue(activeSuspect.occupation)}
                </strong>
              </div>
              <div>
                <span>Age</span>
                <strong>{displayValue(activeSuspect.age)}</strong>
              </div>
              <div>
                <span>Height</span>
                <strong>
                  {displayValue(activeSuspect.height, " cm")}
                </strong>
              </div>
              <div>
                <span>Race</span>
                <strong>
                  {displayValue(activeSuspect.race)}
                </strong>
              </div>
            </div>
          </div>

          <div className="suspect-section">
            <h3>Case Background & Connection</h3>
            <p className="suspect-description">
              {displayValue(activeSuspect.description)}
            </p>
            <p className="suspect-disclaimer">
              This record describes a possible connection to
              the investigation. It does not establish criminal
              responsibility or guilt.
            </p>
          </div>

          <div className="suspect-section">
            <h3>Evidence & Investigation Review</h3>

<div className="suspect-section">
  <h3>Criminal Record & Background Verification</h3>

  <div className="criminal-record-panel">
    <div className="criminal-record-header">
      <div>
        <span className="criminal-record-label">
          CRIMINAL HISTORY STATUS
        </span>
        <h4>
          {activeSuspect.criminalRecordStatus || "Not verified"}
        </h4>
      </div>

      <span className="criminal-record-badge">
        {activeSuspect.criminalRecordStatus
          ? "Recorded status"
          : "Verification required"}
      </span>
    </div>

    <div className="suspect-details-grid">
      <div>
        <span>Previous Convictions</span>
        <strong>
          {activeSuspect.previousConvictions ?? "Not recorded"}
        </strong>
      </div>

      <div>
        <span>Last Background Check</span>
        <strong>
          {activeSuspect.lastBackgroundCheck
            ? new Date(
                activeSuspect.lastBackgroundCheck
              ).toLocaleDateString()
            : "Not recorded"}
        </strong>
      </div>

      <div>
        <span>Verification Source</span>
        <strong>
          {activeSuspect.recordVerificationSource || "Not recorded"}
        </strong>
      </div>

      <div>
        <span>Record Reference</span>
        <strong>
          {activeSuspect.criminalRecordReference || "Not recorded"}
        </strong>
      </div>
    </div>

    <p className="criminal-record-notice">
      Criminal history information must be verified against
      an authorised source. An unknown record does not mean
      that the individual has previous convictions. A prior
      conviction does not establish involvement in this case.
    </p>
  </div>
</div>

            <div className="suspect-review-grid">
              <div>
                <h4>Linked Evidence</h4>
                <p>
                  No verified suspect-to-evidence links
                  are available in the current record.
                </p>
              </div>

              <div>
                <h4>Interview & Statement History</h4>
                <p>
                  No interview records are available
                  through the current suspect profile.
                </p>
              </div>

              <div>
                <h4>Alibi Verification</h4>
                <p>
                  No verified alibi information is
                  available in this record.
                </p>
              </div>

              <div>
                <h4>Follow-up Information</h4>
                <p>
                  Review relevant evidence and record
                  any outstanding investigative questions.
                </p>
              </div>
            </div>
          </div>

          <div className="suspect-dossier-footer">
            <span>
              Profile information retrieved from TracePointAPI.
              Missing information is not assumed.
            </span>
          </div>
        </section>
      ) : (
        <section className="suspect-empty-state">
          <h2>No Suspect Selected</h2>
          <p>
            Select a suspect above to view their detailed profile
            and available investigation information.
          </p>
        </section>
      )}
    </main>
  );
}

export default Suspects;
