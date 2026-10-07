import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
  Zap,
} from "lucide-react";
import Avatar from "./Avatar";

export default function Hero({ scrollToId }) {
  const hero = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-title .line",
          {
            y: 50,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.25"
        )
        .from(
          ".hero-copy",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-meta",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.25"
        )
        .from(
          ".hero-side",
          {
            x: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-info-panel",
          {
            x: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );

      gsap.to(".developer-avatar", {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".avatar-orbit", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero section" id="home" ref={hero}>

      {/* =====================================================
          FINAL RESUME / ACTION BUTTON CSS
      ===================================================== */}
      <style>{`
        .hero-actions {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          flex-wrap: nowrap !important;
          gap: 10px !important;
          width: max-content !important;
          max-width: 100% !important;
        }

        .hero-actions .btn-resume-final {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 0 0 auto !important;

          width: 108px !important;
          min-width: 108px !important;
          height: 48px !important;

          padding: 0 16px !important;
          box-sizing: border-box !important;

          gap: 8px !important;

          border: 1px solid rgba(255, 61, 0, 0.55) !important;
          border-radius: 999px !important;

          background: #171116 !important;
          color: #ffffff !important;

          text-decoration: none !important;

          font-family: inherit !important;
          font-size: 10px !important;
          font-weight: 700 !important;
          letter-spacing: 0.04em !important;
          line-height: 1 !important;
          white-space: nowrap !important;

          cursor: pointer !important;

          box-shadow: 0 7px 20px rgba(0, 0, 0, 0.22) !important;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .hero-actions .btn-resume-final svg {
          width: 15px !important;
          height: 15px !important;
          color: #ff3d00 !important;
          flex-shrink: 0 !important;
          transition: 0.25s ease !important;
        }

        .hero-actions .btn-resume-final:hover {
          background: #ff3d00 !important;
          border-color: #ff3d00 !important;
          color: #ffffff !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 26px rgba(255, 61, 0, 0.28) !important;
        }

        .hero-actions .btn-resume-final:hover svg {
          color: #ffffff !important;
          transform: translate(3px, -3px) !important;
        }

        .hero-actions .btn-resume-final:active {
          transform: translateY(0) !important;
        }

        .hero-actions .btn-primary,
        .hero-actions .btn-ghost,
        .hero-actions .btn-resume-final {
          flex-shrink: 0 !important;
          white-space: nowrap !important;
        }

        @media (max-width: 700px) {
          .hero-actions {
            width: 100% !important;
            max-width: 100% !important;
            flex-wrap: wrap !important;
          }

          .hero-actions .btn-resume-final {
            width: 102px !important;
            min-width: 102px !important;
            height: 44px !important;
            padding: 0 14px !important;
            font-size: 9px !important;
          }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="hero-grid" />
      <div className="hero-blob blob-a" />
      <div className="hero-blob blob-b" />

      {/* PARTICLES */}
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>

      <div className="container hero-layout">

        {/* =================================================
            LEFT
        ================================================= */}
        <div className="hero-copy-wrap">

          <div className="hero-eyebrow">
            <span />
            FULL STACK DEVELOPER
            <span className="eyebrow-dot" />
          </div>

          <h1 className="hero-title">
            <span className="line">
              Hi, I'm
            </span>

            <span className="line accent-text">
              Vikas Kumar
            </span>

            <span className="line">
              Full Stack <em>Developer.</em>
            </span>
          </h1>

          <p className="hero-copy">
            I build fast, modern and scalable web applications using React,
            Node.js, Express.js, MongoDB and Tailwind CSS.
          </p>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}
          <div className="hero-actions">

            {/* VIEW WORK */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToId("projects")}
            >
              View My Work
              <ArrowUpRight size={17} />
            </button>

            {/* CONTACT */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => scrollToId("contact")}
            >
              Contact Me
              <Mail size={16} />
            </button>

            {/* RESUME */}
            <a
              href="/Vikas-Kumar-Resume.pdf"
              download="Vikas-Kumar-Resume.pdf"
              className="btn-resume-final"
              aria-label="Download Resume"
            >
              <span>Resume</span>
              <ArrowUpRight size={15} />
            </a>

          </div>

          {/* META */}
          <div className="hero-meta">

            <span>
              <Zap size={14} />
              Fast learner
            </span>

            <span>
              <Code2 size={14} />
              Clean code
            </span>

            <span>
              <BriefcaseBusiness size={14} />
              Open to work
            </span>

          </div>
        </div>

        {/* =================================================
            CENTER — AVATAR
        ================================================= */}
        <div className="hero-side">
          <Avatar />
        </div>

        {/* =================================================
            RIGHT — INFO PANEL
        ================================================= */}
        <aside className="hero-info-panel">

          <div className="info-heading">
            <span className="info-dot" />
            <span>FULL STACK</span>
          </div>

          <div className="info-divider" />

          <div className="info-block">
            <span className="info-number">
              01
            </span>

            <h3>
              Development
            </h3>

            <p>
              React · Node.js
            </p>

            <p>
              Express.js · MongoDB
            </p>
          </div>

          <div className="info-divider" />

          <div className="info-block">
            <span className="info-number">
              02
            </span>

            <h3>
              What I Build
            </h3>

            <p>
              Modern Interfaces
            </p>

            <p>
              Scalable Web Apps
            </p>
          </div>

          <div className="info-divider" />

          <div className="info-block info-bottom">
            <span className="info-number">
              03
            </span>

            <h3>
              Let's Connect
            </h3>

            <p>
              Have an idea?
            </p>

            <p>
              Let's turn it into reality.
            </p>
          </div>

          <div className="info-status">
            <span />
            Open to work
          </div>

        </aside>
      </div>

      {/* SCROLL */}
      <div className="scroll-cue">
        <span />
        Scroll to explore
      </div>

    </section>
  );
}