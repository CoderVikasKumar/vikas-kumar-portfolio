import SectionHeading from "./SectionHeading";
import "./Experience.css";

const experiences = [
  {
    year: "2026",
    type: "SUMMER TRAINING",
    role: "Full Stack Web Development Trainee",
    company: "VARTAX Global Technology Pvt. Ltd.",
    description:
      "Completed a 45-day hands-on Summer Training program in Web Development, gaining practical experience across frontend and backend technologies. Successfully completed the training with Grade A++.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Git", "GitHub"],
  },
  {
    year: "2025",
    type: "INTERNSHIP",
    role: "Full Stack Development Intern",
    company: "CodeVirus Pvt.",
    description:
      "Worked on modern web applications, developed responsive interfaces and gained practical experience with frontend and backend technologies.",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    year: "2025 — 2026",
    type: "PROJECT EXPERIENCE",
    role: "Full Stack Developer",
    company: "Independent Projects",
    description:
      "Built and deployed full-stack applications with a focus on responsive UI, REST APIs, authentication, database integration and real-world user experiences.",
    stack: ["MERN", "REST API", "Git", "GitHub"],
  },
  {
    year: "2026",
    type: "CURRENT",
    role: "MERN Stack Developer",
    company: "Continuous Learning",
    description:
      "Currently improving full-stack development skills by building production-ready projects and exploring scalable application architecture.",
    stack: ["React", "Node.js", "MongoDB", "Deployment"],
  },
];

export default function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">

        <SectionHeading
          eyebrow="Experience"
          title="Building through real-world experience."
          copy="My development journey is shaped by practical projects, continuous learning and hands-on experience with modern web technologies."
        />

        <div className="experience-list">

          {experiences.map((item, index) => (
            <article
              className="experience-item"
              key={`${item.year}-${item.role}`}
            >

              {/* Timeline */}
              <div className="experience-timeline">
                <span className="experience-dot"></span>

                {index !== experiences.length - 1 && (
                  <span className="experience-line"></span>
                )}
              </div>

              {/* Date */}
              <div className="experience-date">
                <span>{item.year}</span>
                <small>{item.type}</small>
              </div>

              {/* Content */}
              <div className="experience-content">

                <div className="experience-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>

                  <span className="experience-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="experience-description">
                  {item.description}
                </p>

                <div className="experience-stack">
                  {item.stack.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Training highlight */}
                {item.type === "SUMMER TRAINING" && (
                  <div className="experience-highlight">
                    <span>45 DAYS</span>
                    <span>GRADE A++</span>
                    <span>COMPLETED</span>
                  </div>
                )}

              </div>

            </article>
          ))}

        </div>

        <div className="experience-footer">
          <span>
            <i></i>
            OPEN TO NEW OPPORTUNITIES
          </span>

          <p>
            Always looking for meaningful problems to solve.
          </p>
        </div>

      </div>
    </section>
  );
}