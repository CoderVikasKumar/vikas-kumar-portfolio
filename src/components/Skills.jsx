import SectionHeading from "./SectionHeading";
import { skills } from "../data";

import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiGit,
  SiGithub,
} from "react-icons/si";

import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

import "./Skills.css";


// ==========================================
// TECHNOLOGY ICONS
// ==========================================

const skillIcons = {
  HTML: SiHtml5,
  CSS: FaCss3Alt,
  JavaScript: SiJavascript,
  React: SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  Python: SiPython,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
};


// ==========================================
// SKILLS COMPONENT
// ==========================================

export default function Skills() {
  return (
    <section
      className="section skills-section"
      id="skills"
    >
      <div className="container">

        {/* ==========================================
            SECTION HEADING
        ========================================== */}

        <SectionHeading
          eyebrow="Technical Stack"
          title="Technologies I Work With"
          copy="A growing full-stack toolkit focused on modern web development, scalable architecture and polished user experiences."
        />


        {/* ==========================================
            SKILLS GRID
        ========================================== */}

        <div className="skills-grid stagger-grid">

          {skills.map(([name, value, note], index) => {

            const Icon = skillIcons[name];

            return (
              <article
                className="skill-card"
                key={name}
              >

                {/* ==========================================
                    CARD HEADER
                ========================================== */}

                <div className="skill-card-header">

                  <span className="skill-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="skill-label">
                    TECH / DEVELOPMENT
                  </span>

                  <span className="skill-percentage">
                    {value}%
                  </span>

                </div>


                {/* ==========================================
                    SKILL INFORMATION
                ========================================== */}

                <div className="skill-main">

                  <div className="skill-icon">

                    {Icon && (
                      <Icon
                        size={25}
                        aria-hidden="true"
                      />
                    )}

                  </div>


                  <div className="skill-info">

                    <h3>
                      {name}
                    </h3>

                    <p>
                      {note}
                    </p>

                  </div>

                </div>


                {/* ==========================================
                    PROGRESS BAR
                ========================================== */}

                <div className="skill-progress">

                  <div className="skill-progress-track">

                    <span
                      className="skill-progress-fill"
                      style={{
                        width: `${value}%`,
                      }}
                    />

                  </div>


                  <div className="skill-progress-meta">

                    <small>
                      PROFICIENCY
                    </small>

                    <small>
                      {value >= 90
                        ? "ADVANCED"
                        : value >= 75
                        ? "STRONG"
                        : "LEARNING"}
                    </small>

                  </div>

                </div>


                {/* ==========================================
                    CARD FOOTER
                ========================================== */}

                <div className="skill-card-footer">

                  <span>
                    FULL STACK DEVELOPMENT
                  </span>

                  <span className="skill-arrow">
                    ↗
                  </span>

                </div>

              </article>
            );
          })}

        </div>


        {/* ==========================================
            BOTTOM STATUS
        ========================================== */}

        <div className="skills-footer">

          <div className="skills-availability">

            <span className="availability-dot"></span>

            <span>
              CONTINUOUSLY LEARNING
            </span>

          </div>


          <p>
            Building better skills through real-world projects.
          </p>

        </div>

      </div>
    </section>
  );
}