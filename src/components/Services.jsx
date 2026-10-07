import { ArrowUpRight, Code2, Database, Server, Sparkles, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { services } from "../data";
const icons = {Code2,Server,Sparkles,Database,Zap};
export default function Services() {
  return <section className="section services-section" id="services"><div className="container">
    <SectionHeading eyebrow="What I Build" title="Services"/>
    <div className="services-grid stagger-grid">{services.map(([title,desc,icon])=>{const Icon=icons[icon];return <article className="service-card" key={title}>
      <div className="service-icon"><Icon size={20}/></div><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight className="service-arrow" size={18}/>
    </article>})}</div>
  </div></section>;
}
