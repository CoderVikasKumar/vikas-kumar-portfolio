import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "../data";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">

        {/* =========================
            SECTION HEADING
        ========================== */}

        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Engineering Projects"
          copy="A selection of practical projects designed to solve real problems and demonstrate full-stack thinking."
        />


        {/* =========================
            PROJECT GRID
        ========================== */}

        <div className="projects-grid stagger-grid">

          {projects.map((project) => (
            <article
              className={`project-card ${project.accent || ""}`}
              key={project.number}
            >

              {/* =========================
                  PROJECT IMAGE
              ========================== */}

              <div className="project-image">

                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                />

                <div className="project-image-overlay">

                  <span>
                    PROJECT {project.number}
                  </span>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                  />

                </div>

              </div>


              {/* =========================
                  PROJECT META
              ========================== */}

              <div className="project-meta">

                <span className="project-number">
                  // PROJECT {project.number}
                </span>

                <span className="project-category">
                  {project.category}
                </span>

              </div>


              {/* =========================
                  PROJECT CONTENT
              ========================== */}

              <div className="project-content">

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

              </div>


              {/* =========================
                  TECHNOLOGY TAGS
              ========================== */}

              <div className="tags">

                {project.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}

              </div>


              {/* =========================
                  PROJECT LINKS
              ========================== */}

              <div className="project-links">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="project-link github-link"
                >
                  <span>GitHub</span>

                  <Github
                    size={14}
                    strokeWidth={1.8}
                  />
                </a>


                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo of ${project.title}`}
                  className="project-link demo-link"
                >
                  <span>Live Demo</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                  />
                </a>

              </div>

            </article>
          ))}

        </div>


        {/* =========================
            BOTTOM INFORMATION
        ========================== */}

        <div className="projects-footer">

          <div className="projects-status">

            <span className="status-dot"></span>

            <span>
              SELECTED ENGINEERING WORK
            </span>

          </div>

          <p>
            More projects and source code available on GitHub.
          </p>

        </div>

      </div>
    </section>
  );
}