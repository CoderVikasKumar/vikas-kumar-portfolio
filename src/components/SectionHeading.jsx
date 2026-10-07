export default function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading reveal">
      <div className="eyebrow">/// {eyebrow}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
