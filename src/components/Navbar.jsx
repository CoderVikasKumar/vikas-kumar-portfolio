import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems } from "../data";

export default function Navbar({ scrollToId }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  const downloadResume = () => {
    setOpen(false);

    const link = document.createElement("a");
    link.href = "/Vikas-Kumar-Resume.pdf";
    link.download = "Vikas-Kumar-Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <button
          className="logo"
          onClick={() => go("home")}
          aria-label="Go to home"
        >
          Vikas<span>Kumar.</span>
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${open ? "is-open" : ""}`}>

          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}

          {/* Resume */}
          <button
            className="nav-resume"
            onClick={downloadResume}
          >
            Resume
          </button>

          {/* Hire Me */}
          <button
            className="nav-hire"
            onClick={() => go("contact")}
          >
            Hire Me
            <ArrowUpRight size={14} />
          </button>

        </nav>

        {/* Mobile Menu */}
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>
    </header>
  );
}