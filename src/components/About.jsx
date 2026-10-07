import SectionHeading from "./SectionHeading";
import "./About.css";

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">

        {/* Section Heading */}
        <SectionHeading
          eyebrow="System Profile"
          title="Passionate Full Stack Developer"
          copy="I enjoy creating beautiful, responsive websites with React, Node.js, Express.js and MongoDB. I love solving real-world problems and building high-quality user experiences."
        />

        {/* About Content */}
        <div className="about-content">

          {/* Left Side */}
          <div className="about-intro">
            <span className="about-label">
              01 — ABOUT ME
            </span>

            <h3>
              Turning ideas into
              <span> digital experiences.</span>
            </h3>
          </div>

          {/* Right Side */}
          <div className="about-description">

            <p className="about-lead">
              I'm <strong>Vikas Kumar</strong>, a Full Stack Developer
              focused on building modern, responsive and scalable
              web applications.
            </p>

            <p>
              I work with the MERN stack and enjoy developing both
              polished frontend interfaces and reliable backend
              systems. My focus is on writing clean code and creating
              experiences that are simple, fast and easy to use.
            </p>

            <a
              href="#contact"
              className="about-link"
            >
              LET'S WORK TOGETHER
              <span>↗</span>
            </a>

          </div>

        </div>

        {/* Stats */}
        <div className="stats-grid stagger-grid">

          {/* Stat 01 */}
          <div className="stat-card">

            <div className="stat-number">
              01
            </div>

            <strong>
              1+
            </strong>

            <span>
              Years Learning
            </span>

            <small>
              Consistent growth
            </small>

          </div>


          {/* Stat 02 */}
          <div className="stat-card">

            <div className="stat-number">
              02
            </div>

            <strong>
              20+
            </strong>

            <span>
              Projects
            </span>

            <small>
              Built & shipped
            </small>

          </div>


          {/* Stat 03 */}
          <div className="stat-card">

            <div className="stat-number">
              03
            </div>

            <strong>
              100%
            </strong>

            <span>
              Responsive
            </span>

            <small>
              Every screen matters
            </small>

          </div>

        </div>

      </div>
    </section>
  );
}