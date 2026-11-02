interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * A field people never see or fill in. Simple bots fill every input, and the server
 * quietly drops any submission where this "website" field has a value.
 */
const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      Website
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  </div>
);

export default HoneypotField;
