
import { useEffect, useRef, useState } from "react";
import EvidenceCard from "../components/EvidenceCard";
import evidenceBg from "../assets/evidence.jpg";
import "./EvidenceUploads.css";

const API = "http://localhost:5291/api";

function Evidence() {
  const [evidence, setEvidence] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const [caseID, setCaseID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInput = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const responses = await Promise.all([
          fetch(`${API}/evidence`, {
            signal: controller.signal
          }),
          fetch(`${API}/EvidenceAttachments`, {
            signal: controller.signal
          }),
          fetch(`${API}/cases`, {
            signal: controller.signal
          })
        ]);

        if (responses.some(response => !response.ok)) {
          throw new Error("Unable to retrieve investigation records.");
        }

        const [evidenceData, attachmentData, caseData] =
          await Promise.all(responses.map(r => r.json()));

        setEvidence(evidenceData);
        setAttachments(attachmentData);
        setCases(caseData);

        if (caseData.length > 0) {
          setCaseID(String(caseData[0].caseID));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => controller.abort();
  }, []);

  async function refreshAttachments() {
    const response = await fetch(
      `${API}/EvidenceAttachments`
    );

    if (!response.ok) {
      throw new Error("Could not refresh uploaded documents.");
    }

    setAttachments(await response.json());
  }

  async function handleUpload(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!caseID || !title.trim() || !file) {
      setError("Select a case, enter a title and choose a file.");
      return;
    }

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (![".pdf", ".docx", ".txt"].includes(extension)) {
      setError("Only PDF, DOCX and TXT documents are supported.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("The file must not exceed 10 MB.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("caseID", caseID);
      formData.append("title", title.trim());
      formData.append("description", description);
      formData.append("file", file);

      const response = await fetch(
        `${API}/EvidenceAttachments/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(
          `Evidence upload failed (HTTP ${response.status}).`
        );
      }

      setSuccess("Evidence uploaded and saved successfully.");

      setTitle("");
      setDescription("");
      setFile(null);

      if (fileInput.current) {
        fileInput.current.value = "";
      }

      await refreshAttachments();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="evidence-page"
      style={{ backgroundImage: `url(${evidenceBg})` }}
    >
      <div className="page-content">
        <h1>Evidence Management</h1>

        <p>
          Examine existing case evidence and upload
          supporting investigation documents.
        </p>

        {loading && <p role="status">Loading evidence...</p>}

        <h2>Case Evidence</h2>

        <div className="evidence-list">
          {evidence.map(item => (
            <EvidenceCard
              key={item.evidenceID}
              evidence={item}
              onExamine={setSelectedEvidence}
            />
          ))}
        </div>

        {selectedEvidence && (
          <section className="selected-evidence">
            <h2>Evidence Details</h2>
            <p><strong>Title:</strong> {selectedEvidence.title}</p>
            <p><strong>Location:</strong> {selectedEvidence.location}</p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedEvidence.description}
            </p>
          </section>
        )}

        <section className="evidence-upload-panel">
          <h2>Register Written Evidence</h2>
          <p>
            Attach a document to an existing investigation case.
          </p>

          <form onSubmit={handleUpload}>
            <label htmlFor="attachment-case">
              Investigation Case
            </label>
            <select
              id="attachment-case"
              value={caseID}
              onChange={e => setCaseID(e.target.value)}
              required
            >
              <option value="">Select a case</option>
              {cases.map(item => (
                <option key={item.caseID} value={item.caseID}>
                  {item.caseName}
                </option>
              ))}
            </select>

            <label htmlFor="attachment-title">
              Document Title
            </label>
            <input
              id="attachment-title"
              type="text"
              maxLength={200}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Laboratory Witness Statement"
              required
            />

            <label htmlFor="attachment-description">
              Evidence Description
            </label>
            <textarea
              id="attachment-description"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the document and its relevance"
            />

            <label htmlFor="attachment-file">
              Evidence Document
            </label>
            <input
              id="attachment-file"
              type="file"
              accept=".pdf,.docx,.txt"
              ref={fileInput}
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              required
            />

            <button
              type="submit"
              disabled={uploading || loading || cases.length === 0}
            >
              {uploading ? "UPLOADING..." : "SAVE EVIDENCE"}
            </button>
          </form>

          {error && (
            <p className="upload-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="upload-success" role="status">
              {success}
            </p>
          )}
        </section>

        <section className="uploaded-evidence-section">
          <div className="uploaded-evidence-heading">
            <h2>Uploaded Evidence Documents</h2>

            <button
              type="button"
              onClick={async () => {
                try {
                  setError("");
                  await refreshAttachments();
                } catch (err) {
                  setError(err.message);
                }
              }}
            >
              Refresh Records
            </button>
          </div>

          {!loading && attachments.length === 0 && (
            <p>No uploaded evidence documents found.</p>
          )}

          <div className="uploaded-evidence-list">
            {attachments.map(item => (
              <article
                className="uploaded-evidence-card"
                key={item.evidenceAttachmentID}
              >
                <span className="document-reference">
                  DOCUMENT #{item.evidenceAttachmentID}
                </span>

                <h3>{item.title}</h3>

                <p>
                  {item.description || "No description recorded."}
                </p>

                <p><strong>Case:</strong> #{item.caseID}</p>

                <p>
                  <strong>File:</strong> {item.originalFileName}
                </p>

                <p>
                  <strong>Uploaded:</strong>{" "}
                  {new Date(item.uploadedAt).toLocaleString()}
                </p>

                <a
                  className="evidence-download-link"
                  href={`${API}/EvidenceAttachments/${item.evidenceAttachmentID}/download`}
                >
                  DOWNLOAD DOCUMENT
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Evidence;
