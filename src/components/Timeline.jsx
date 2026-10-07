import SectionHeading from "./SectionHeading";
import { timeline } from "../data";
export default function Timeline() {
  return <section className="section timeline-section" id="journey"><div className="container">
    <SectionHeading eyebrow="Engineering Roadmap" title="Learning Journey"/>
    <div className="timeline stagger-grid">{timeline.map(([n,title,desc,tech],i)=><article className="timeline-item" key={n}>
      <div className="timeline-number">{n}</div><div className="timeline-line"/><div className="timeline-content"><span>ROOT {n}</span><h3>{title}</h3><p>{desc}</p><b>{tech}</b></div>
    </article>)}</div>
  </div></section>;
}
