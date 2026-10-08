function InvestigationForm({
  suspectID,
  conclusion,
  onSuspectChange,
  onConclusionChange,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit}>

      <label htmlFor="suspect">
        Suspect
      </label>

      <select
        id="suspect"
        value={suspectID}
        onChange={onSuspectChange}
      >
        <option value="">
          Select a suspect
        </option>

        <option value="1">
          Alex Morgan
        </option>

        <option value="2">
          Jamie Smith
        </option>

        <option value="3">
          Taylor Williams
        </option>

      </select>

      <label htmlFor="conclusion">
        Conclusion
      </label>

      <textarea
        id="conclusion"
        value={conclusion}
        onChange={onConclusionChange}
        rows="6"
      />

      <button type="submit">
        SUBMIT INVESTIGATION
      </button>

    </form>
  );
}

export default InvestigationForm;