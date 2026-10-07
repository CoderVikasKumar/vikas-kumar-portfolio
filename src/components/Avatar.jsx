export default function Avatar() {
  return (
    <div className="avatar-layout">

      {/* CENTER PHOTO CARD */}
      <div className="avatar-card">

        {/* Card Top */}
        <div className="avatar-card-top">
          <span className="avatar-label">DEVELOPER 01</span>
          <span className="avatar-menu">III</span>
        </div>

        {/* Photo */}
        <div className="avatar-photo-wrap">
          <img
            className="developer-photo"
            src="/vikas.png"
            alt="Vikas Kumar - Full Stack Developer"
          />
        </div>

        {/* Card Bottom */}
        <div className="avatar-card-bottom">
          <h3>Vikas Kumar</h3>
          <p>FULL STACK DEVELOPER</p>
        </div>

      </div>

      {/* RIGHT INFORMATION PANEL
      <div className="avatar-info-panel">

        <div className="info-top">
          <span className="info-dot"></span>
          <span>FULL STACK</span>
        </div>

        <div className="info-divider"></div>

        <div className="info-group">
          <span>01</span>
          <p>React</p>
          <p>Node.js</p>
          <p>MongoDB</p>
        </div>

        <div className="info-divider"></div>

        <div className="info-group">
          <span>02</span>
          <p>Clean Code</p>
          <p>Modern UI</p>
          <p>Scalable Apps</p>
        </div>

        <div className="info-divider"></div>

        <div className="info-bottom">
          <span className="info-dot"></span>
          <p>Open to work</p>
        </div>

      </div> */}

    </div>
  );
}