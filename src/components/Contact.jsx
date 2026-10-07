import { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";

import SectionHeading from "./SectionHeading";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(
        "https://vikas-kumar-portfolio-5v8r.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">

        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something Great."
          copy="Have a project, internship opportunity or idea in mind? Let's connect and turn it into something meaningful."
        />

        <div className="contact-grid">

          {/* LEFT */}
          <div className="contact-intro">

            <span className="contact-label">
              01 — CONTACT
            </span>

            <h3>
              Let's work
              <span> together.</span>
            </h3>

            <p>
              I'm open to internships, freelance opportunities,
              collaborations and interesting web development projects.
            </p>

            <a
              href="mailto:vikashkumarvikashkumar47178@gmail.com"
              className="contact-email"
            >
              <Mail size={17} />

              <span>
                vikashkumarvikashkumar47178@gmail.com
              </span>

              <ArrowUpRight size={15} />
            </a>

          </div>


          {/* RIGHT */}
          <div className="contact-card">

            <div className="contact-card-top">
              <span>AVAILABLE FOR</span>

              <span className="contact-status">
                <i></i>
                OPPORTUNITIES
              </span>
            </div>


            <div className="contact-card-content">

              <h4>
                Have an idea?
              </h4>

              <p>
                Tell me about your project, internship or
                collaboration opportunity.
              </p>


              {/* CONTACT FORM */}
              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <div className="contact-form-row">

                  <div className="contact-field">
                    <label htmlFor="name">
                      NAME
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </div>


                  <div className="contact-field">
                    <label htmlFor="email">
                      EMAIL
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Please Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>


                <div className="contact-field">
                  <label htmlFor="subject">
                    SUBJECT
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                  />
                </div>


                <div className="contact-field">
                  <label htmlFor="message">
                    MESSAGE
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                  />
                </div>


                {status.message && (
                  <div
                    className={`contact-form-status ${status.type}`}
                  >
                    {status.message}
                  </div>
                )}


                <button
                  type="submit"
                  className="contact-button"
                  disabled={loading}
                >
                  {loading
                    ? "SENDING..."
                    : "SEND MESSAGE"}

                  {loading ? (
                    <span className="contact-loading-dot">
                      ...
                    </span>
                  ) : (
                    <Send size={16} />
                  )}
                </button>

              </form>

            </div>


            {/* SOCIALS */}
            <div className="contact-socials">

              <a
                href="https://github.com/CoderVikasKumar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>


              <a
                href="https://www.linkedin.com/in/%EA%AA%9C%C4%B1k%EA%AB%9Ds-kumar-1010b33a2/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>


              <a
                href="https://www.instagram.com/_jatav_vikaskum/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>

            </div>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="contact-footer">

          <span>
            <i></i>
            OPEN TO NEW OPPORTUNITIES
          </span>

          <span>
            BASED IN INDIA
          </span>

        </div>

      </div>
    </section>
  );
}