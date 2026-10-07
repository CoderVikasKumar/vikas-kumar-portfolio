import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

import "./Footer.css";

export default function Footer({ scrollToId }) {
  const handleScroll = (id) => {
    if (scrollToId) {
      scrollToId(id);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="footer-section">

      <div className="container">

        {/* ==========================================
            TOP
        ========================================== */}

        <div className="footer-top">

          <div className="footer-brand">

            <a
              href="#home"
              className="footer-logo"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("home");
              }}
            >
              Vikas<span>Kumar.</span>
            </a>

            <p>
              Full Stack Developer building modern,
              responsive and meaningful digital experiences.
            </p>

          </div>


          {/* ==========================================
              NAVIGATION
          ========================================== */}

          <div className="footer-navigation">

            <span className="footer-heading">
              NAVIGATION
            </span>

            <div className="footer-links">

              <button onClick={() => handleScroll("home")}>
                Home
              </button>

              <button onClick={() => handleScroll("about")}>
                About
              </button>

              <button onClick={() => handleScroll("skills")}>
                Skills
              </button>

              <button onClick={() => handleScroll("experience")}>
                Experience
              </button>

              <button onClick={() => handleScroll("projects")}>
                Projects
              </button>

              <button onClick={() => handleScroll("contact")}>
                Contact
              </button>

            </div>

          </div>


          {/* ==========================================
              SOCIAL
          ========================================== */}

          <div className="footer-social">

            <span className="footer-heading">
              CONNECT
            </span>

            <div className="footer-social-links">

              <a
                href="https://github.com/CoderVikasKumar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://www.linkedin.com/in/%EA%AA%9C%C4%B1k%EA%AB%9Ds-kumar-1010b33a2/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://www.instagram.com/_jatav_vikaskum/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={16} />
                <span>Instagram</span>
                <ArrowUpRight size={13} />
              </a>

            </div>

          </div>

        </div>


        {/* ==========================================
            DIVIDER
        ========================================== */}

        <div className="footer-divider"></div>


        {/* ==========================================
            BOTTOM
        ========================================== */}

        <div className="footer-bottom">

          <span>
            © 2026 Vikas Kumar. All rights reserved.
          </span>

          <span className="footer-status">
            <i></i>
            BUILT WITH REACT
          </span>

          <button
            className="back-top"
            onClick={() => handleScroll("home")}
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>

        </div>

      </div>

    </footer>
  );
}