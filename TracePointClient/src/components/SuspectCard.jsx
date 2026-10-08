
import alexMorgan from "../assets/alexMorgan.png";
import jamieSmith from "../assets/jamieSmith.jpg";
import taylorWilliams from "../assets/taylorWilliams.jpeg";

export const suspectPhotos = {
  "Alex Morgan": alexMorgan,
  "Jamie Smith": jamieSmith,
  "Taylor Williams": taylorWilliams,
};

function SuspectCard({ suspect, onSelect, isSelected = false }) {
  const photo = suspectPhotos[suspect.name];

  return (
    <article
      className={`suspect-card ${isSelected ? "suspect-card-active" : ""}`}
    >
      <div className="suspect-card-header">
        {photo ? (
          <img
            src={photo}
            alt={`Portrait of ${suspect.name}`}
            className="suspect-avatar"
          />
        ) : (
          <div className="suspect-avatar suspect-avatar-fallback">
            No Photo
          </div>
        )}

        <div>
          <span className="suspect-card-id">
            PROFILE #{suspect.suspectID}
          </span>

          <h2>{suspect.name}</h2>
          <h3>{suspect.occupation || "Occupation not recorded"}</h3>
        </div>
      </div>

      <p>
        {suspect.description || "No background information recorded."}
      </p>

      <button
        type="button"
        onClick={() => onSelect(suspect)}
        aria-pressed={isSelected}
      >
        {isSelected ? "SELECTED PROFILE" : "VIEW SUSPECT PROFILE"}
      </button>
    </article>
  );
}

export default SuspectCard;
